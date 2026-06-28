package com.mundial2026.service;

import com.mundial2026.entity.*;
import com.mundial2026.entity.usuario.General;
import com.mundial2026.repository.*;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.exception.InvalidOperationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class CompraService {

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private EntradaRepository entradaRepository;

    @Autowired
    private SectorRepository sectorRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private GeneralRepository generalRepository;

    public Compra crearCompra(Integer usuarioId, Integer eventoId, Character codigoSector, Integer cantEntradas) {
        if (cantEntradas <= 0 || cantEntradas >= 6) {
            throw new InvalidOperationException("La cantidad de entradas debe estar entre 1 y 5");
        }

        Evento evento = eventoRepository.findById(eventoId)
                .orElseThrow(() -> new ResourceNotFoundException("Evento no encontrado"));

        LocalDateTime fechaHoraEvento = LocalDateTime.of(evento.getFechaEvento(), evento.getHoraEvento());
        if (fechaHoraEvento.isBefore(LocalDateTime.now())) {
            throw new InvalidOperationException("No se pueden comprar entradas de un evento que ya pasó");
        }

        Sector sector = sectorRepository.findByEstadioAndCodigo(evento.getEstadio(), codigoSector)
                .orElseThrow(() -> new ResourceNotFoundException("Sector no encontrado"));

        List<Entrada> entradasDisponibles = entradaRepository.findByEventoAndEstado(evento, "DISPONIBLE");
        
        if (entradasDisponibles.size() < cantEntradas) {
            throw new InvalidOperationException("No hay suficientes entradas disponibles");
        }

        General comprador = generalRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        if (!Boolean.TRUE.equals(comprador.getVerificacion())) {
            throw new InvalidOperationException("Debés verificar tu cuenta antes de poder comprar entradas");
        }

        // Seleccionar entradas del sector
        Set<Entrada> entradasSeleccionadas = new HashSet<>();
        int contador = 0;
        for (Entrada entrada : entradasDisponibles) {
            if (entrada.getSector().getId().equals(sector.getId()) && contador < cantEntradas) {
                entradasSeleccionadas.add(entrada);
                contador++;
            }
        }

        if (contador < cantEntradas) {
            throw new InvalidOperationException("No hay suficientes entradas en este sector");
        }

        // Costo de la entrada, ya fijado al generarse desde el precio del sector
        BigDecimal costoPorEntrada = entradasSeleccionadas.iterator().next().getCosto();
        BigDecimal comision = costoPorEntrada.multiply(new BigDecimal("0.10")); // 10%
        BigDecimal montoTotal = costoPorEntrada.multiply(new BigDecimal(cantEntradas));

        Compra compra = new Compra();
        compra.setUsuario(comprador);
        compra.setCantEntradas(cantEntradas);
        compra.setMontoTotal(montoTotal);
        compra = compraRepository.save(compra);

        for (Entrada entrada : entradasSeleccionadas) {
            entrada.setEstado("VENDIDA");
            entrada.setPropietarioActualEmail(comprador.getEmail());
            entrada.setComision(comision);
            entrada.setCompra(compra);
        }
        entradaRepository.saveAll(entradasSeleccionadas);

        return compra;
    }

    public List<Compra> listarTodas() {
        return compraRepository.findAll();
    }

    public Compra obtenerCompra(Integer compraId) {
        return compraRepository.findById(compraId)
                .orElseThrow(() -> new ResourceNotFoundException("Compra no encontrada"));
    }

    public List<Compra> obtenerComprasPorUsuario(Integer usuarioId) {
        General usuario = generalRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return compraRepository.findByUsuario(usuario);
    }

    public void confirmarCompra(Integer compraId) {
        Compra compra = obtenerCompra(compraId);
        compra.setEstado("CONFIRMADA");
        compraRepository.save(compra);
    }

    public void pagarCompra(Integer compraId) {
        Compra compra = obtenerCompra(compraId);
        if (!compra.getEstado().equals("CONFIRMADA")) {
            throw new InvalidOperationException("La compra debe estar confirmada para ser pagada");
        }
        compra.setEstado("PAGA");
        compraRepository.save(compra);
    }
}
