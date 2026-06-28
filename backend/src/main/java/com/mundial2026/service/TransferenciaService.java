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
import com.mundial2026.exception.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TransferenciaService {

    private static final int MAXIMO_TRANSFERENCIAS_POR_ENTRADA = 3;

    @Autowired
    private TransferenciaRepository transferenciaRepository;

    @Autowired
    private EntradaRepository entradaRepository;

    @Autowired
    private GeneralRepository generalRepository;

    public List<Transferencia> crearTransferencia(Integer remitenteId, Integer destinatarioId,
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

        List<Entrada> entradas = new ArrayList<>();
        for (Integer entradaId : entradaIds) {
            Entrada entrada = entradaRepository.findById(entradaId)
                    .orElseThrow(() -> new ResourceNotFoundException("Entrada no encontrada: " + entradaId));

            if (entrada.getPropietarioActualEmail() == null
                    || !entrada.getPropietarioActualEmail().equals(remitente.getEmail())) {
                throw new InvalidOperationException("La entrada " + entradaId + " no pertenece al remitente");
            }

            if (transferenciaRepository.existsByEntradaAndAprobacionIsNull(entrada)) {
                throw new InvalidOperationException("La entrada " + entradaId + " ya tiene una transferencia pendiente");
            }

            if (transferenciaRepository.countByEntradaAndAprobacionTrue(entrada) >= MAXIMO_TRANSFERENCIAS_POR_ENTRADA) {
                throw new InvalidOperationException("La entrada " + entradaId
                        + " ya alcanzó el máximo de " + MAXIMO_TRANSFERENCIAS_POR_ENTRADA + " transferencias");
            }

            entradas.add(entrada);
        }

        List<Transferencia> transferencias = new ArrayList<>();
        for (Entrada entrada : entradas) {
            Transferencia transferencia = new Transferencia();
            transferencia.setEntrada(entrada);
            transferencia.setRemitente(remitente);
            transferencia.setDestinatario(destinatario);
            transferencia.setCantTransferida(1);
            transferencia.setAprobacion(null); // Pendiente hasta que el destinatario decida
            transferencias.add(transferenciaRepository.save(transferencia));
        }

        return transferencias;
    }

    public Transferencia obtenerTransferencia(Integer id) {
        return transferenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transferencia no encontrada"));
    }

    public Transferencia aceptarTransferencia(Integer transferenciaId, String emailDestinatario) {
        Transferencia transferencia = obtenerPendienteDelDestinatario(transferenciaId, emailDestinatario);

        Entrada entrada = transferencia.getEntrada();
        entrada.setPropietarioActualEmail(transferencia.getDestinatario().getEmail());
        entrada.setEstado("TRANSFERIDA");
        entradaRepository.save(entrada);

        transferencia.setAprobacion(true);
        return transferenciaRepository.save(transferencia);
    }

    public Transferencia rechazarTransferencia(Integer transferenciaId, String emailDestinatario) {
        Transferencia transferencia = obtenerPendienteDelDestinatario(transferenciaId, emailDestinatario);
        transferencia.setAprobacion(false);
        return transferenciaRepository.save(transferencia);
    }

    private Transferencia obtenerPendienteDelDestinatario(Integer transferenciaId, String emailDestinatario) {
        Transferencia transferencia = obtenerTransferencia(transferenciaId);

        if (!transferencia.getDestinatario().getEmail().equals(emailDestinatario)) {
            throw new UnauthorizedException("La transferencia no pertenece al usuario autenticado");
        }

        if (transferencia.getAprobacion() != null) {
            throw new InvalidOperationException("La transferencia ya fue resuelta");
        }

        return transferencia;
    }

    public List<TransferenciaDTO> listarTodas() {
        return transferenciaRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<TransferenciaDTO> misTransferencias(String email) {
        General usuario = generalRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + email));

        return transferenciaRepository.findByRemitenteOrDestinatarioOrderByFechaTransferenciaDesc(usuario, usuario)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public TransferenciaDTO toDto(Transferencia transferencia) {
        Entrada entrada = transferencia.getEntrada();
        String estado = transferencia.getAprobacion() == null
                ? "PENDIENTE"
                : (transferencia.getAprobacion() ? "ACEPTADA" : "RECHAZADA");

        return new TransferenciaDTO(
                transferencia.getId(),
                entrada.getId(),
                entrada.getEvento().getEquipoLocal().getNombreEquipo(),
                entrada.getEvento().getEquipoVisitante().getNombreEquipo(),
                entrada.getEvento().getFechaEvento(),
                entrada.getSector().getCodigo(),
                transferencia.getRemitente().getEmail(),
                transferencia.getDestinatario().getEmail(),
                estado,
                transferencia.getFechaTransferencia()
        );
    }
}
