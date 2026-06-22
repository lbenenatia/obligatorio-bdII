package com.mundial2026.service;

import com.mundial2026.dto.TransferenciaDTO;
import com.mundial2026.entity.Transferencia;
import com.mundial2026.entity.Entrada;
import com.mundial2026.entity.usuario.General;
import com.mundial2026.repository.TransferenciaRepository;
import com.mundial2026.repository.EntradaRepository;
import com.mundial2026.repository.GeneralRepository;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.exception.InvalidOperationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TransferenciaService {

    @Autowired
    private TransferenciaRepository transferenciaRepository;

    @Autowired
    private EntradaRepository entradaRepository;

    @Autowired
    private GeneralRepository generalRepository;

    public Transferencia crearTransferencia(Integer remitenteId, Integer destinatarioId,
                                           Integer cantTransf, Set<Integer> entradaIds) {
        if (cantTransf <= 0 || cantTransf >= 4) {
            throw new InvalidOperationException("La cantidad de transferencias debe estar entre 1 y 3");
        }

        if (remitenteId.equals(destinatarioId)) {
            throw new InvalidOperationException("El remitente y destinatario no pueden ser la misma persona");
        }

        if (entradaIds.size() != cantTransf) {
            throw new InvalidOperationException("La cantidad de entradas no coincide con la cantidad a transferir");
        }

        General remitente = generalRepository.findById(remitenteId)
                .orElseThrow(() -> new ResourceNotFoundException("Remitente no encontrado: " + remitenteId));
        General destinatario = generalRepository.findById(destinatarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Destinatario no encontrado: " + destinatarioId));

        Set<Entrada> entradas = new HashSet<>();
        for (Integer entradaId : entradaIds) {
            Entrada entrada = entradaRepository.findById(entradaId)
                    .orElseThrow(() -> new ResourceNotFoundException("Entrada no encontrada: " + entradaId));

            if (entrada.getPropietarioActual() == null
                    || !entrada.getPropietarioActual().getId().equals(remitente.getId())) {
                throw new InvalidOperationException("La entrada " + entradaId + " no pertenece al remitente");
            }

            entradas.add(entrada);
        }

        Transferencia transferencia = new Transferencia();
        transferencia.setRemitente(remitente);
        transferencia.setDestinatario(destinatario);
        transferencia.setCantTransf(cantTransf);
        transferencia.setEntradas(entradas);
        transferencia.setAprobacion(true); // Auto-aprobada, sin cola de revisión por ahora

        for (Entrada entrada : entradas) {
            entrada.setEstado("TRANSFERIDA");
            entrada.setPropietarioActual(destinatario);
        }
        entradaRepository.saveAll(entradas);

        return transferenciaRepository.save(transferencia);
    }

    public Transferencia obtenerTransferencia(Integer id) {
        return transferenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transferencia no encontrada"));
    }

    public List<Transferencia> obtenerPendientes() {
        return transferenciaRepository.findByRemitenteAndAprobacion(null, false);
    }

    public void aprobarTransferencia(Integer transferenciaId) {
        Transferencia transferencia = obtenerTransferencia(transferenciaId);
        transferencia.setAprobacion(true);
        
        // Cambiar estado de entradas
        for (Entrada entrada : transferencia.getEntradas()) {
            entrada.setEstado("TRANSFERIDA");
            entradaRepository.save(entrada);
        }
        
        transferenciaRepository.save(transferencia);
    }

    public void rechazarTransferencia(Integer transferenciaId) {
        Transferencia transferencia = obtenerTransferencia(transferenciaId);
        transferenciaRepository.delete(transferencia);
    }

    public List<TransferenciaDTO> listarTodas() {
        return transferenciaRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public TransferenciaDTO toDto(Transferencia transferencia) {
        return new TransferenciaDTO(
                transferencia.getId(),
                transferencia.getRemitente().getEmail(),
                transferencia.getDestinatario().getEmail(),
                transferencia.getCantTransf(),
                transferencia.getAprobacion(),
                transferencia.getEntradas().stream().map(Entrada::getId).collect(Collectors.toList())
        );
    }
}
