package com.mundial2026.service;

import com.mundial2026.dto.EntradaDTO;
import com.mundial2026.entity.Entrada;
import com.mundial2026.entity.Evento;
import com.mundial2026.entity.Sector;
import com.mundial2026.entity.usuario.Funcionario;
import com.mundial2026.entity.usuario.General;
import com.mundial2026.entity.usuario.Usuario;
import com.mundial2026.exception.InvalidOperationException;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.exception.UnauthorizedException;
import com.mundial2026.repository.EntradaRepository;
import com.mundial2026.repository.EventoSectorRepository;
import com.mundial2026.repository.FuncionarioRepository;
import com.mundial2026.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntradaService {

    @Autowired
    private EntradaRepository entradaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private EventoSectorRepository eventoSectorRepository;

    public List<EntradaDTO> misEntradas(String email) {
        General usuario = obtenerGeneralPorEmail(email);
        return entradaRepository.findByPropietarioActual(usuario).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public EntradaDTO obtenerParaUsuario(Integer entradaId, String email) {
        Entrada entrada = entradaRepository.findById(entradaId)
                .orElseThrow(() -> new ResourceNotFoundException("Entrada no encontrada"));
        General usuario = obtenerGeneralPorEmail(email);

        if (entrada.getPropietarioActual() == null
                || !entrada.getPropietarioActual().getId().equals(usuario.getId())) {
            throw new UnauthorizedException("La entrada no pertenece al usuario autenticado");
        }

        return toDto(entrada);
    }

    public List<EntradaDTO> misValidadas(String email) {
        Funcionario funcionario = funcionarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Funcionario no encontrado"));
        return entradaRepository.findByValidadoPor(funcionario).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public EntradaDTO toDto(Entrada entrada) {
        Evento evento = entrada.getEvento();
        Sector sector = entrada.getSector();

        var precio = eventoSectorRepository.findByEventoAndSector(evento, sector)
                .map(es -> es.getPrecio())
                .orElse(sector.getPrecio());

        return new EntradaDTO(
                entrada.getId(),
                evento.getId(),
                evento.getEquipoLocal().getNombreEquipo(),
                evento.getEquipoVisitante().getNombreEquipo(),
                evento.getFechaEvento(),
                evento.getHoraEvento(),
                evento.getEstadio().getNombreEstadio(),
                sector.getCodigo(),
                precio,
                entrada.getNumeroAsiento(),
                entrada.getEstado(),
                entrada.getCodigoQR(),
                entrada.getConsumida(),
                entrada.getFechaConsumo()
        );
    }

    private General obtenerGeneralPorEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        if (!(usuario instanceof General)) {
            throw new InvalidOperationException("El usuario autenticado no es un espectador");
        }
        return (General) usuario;
    }
}
