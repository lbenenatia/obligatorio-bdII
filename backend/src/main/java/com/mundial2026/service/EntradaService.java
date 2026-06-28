package com.mundial2026.service;

import com.mundial2026.dto.EntradaDTO;
import com.mundial2026.entity.Entrada;
import com.mundial2026.entity.Evento;
import com.mundial2026.entity.Sector;
import com.mundial2026.entity.Transferencia;
import com.mundial2026.entity.usuario.Funcionario;
import com.mundial2026.entity.usuario.General;
import com.mundial2026.entity.usuario.Usuario;
import com.mundial2026.exception.InvalidOperationException;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.exception.UnauthorizedException;
import com.mundial2026.repository.EntradaRepository;
import com.mundial2026.repository.FuncionarioRepository;
import com.mundial2026.repository.TransferenciaRepository;
import com.mundial2026.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
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
    private TransferenciaRepository transferenciaRepository;

    public List<EntradaDTO> misEntradas(String email) {
        General usuario = obtenerGeneralPorEmail(email);

        List<EntradaDTO> resultado = new ArrayList<>();
        entradaRepository.findByPropietarioActualEmail(email).forEach(
                entrada -> resultado.add(toDto(entrada, null)));

        transferenciaRepository.findByDestinatarioAndAprobacionIsNull(usuario).forEach(
                transferencia -> resultado.add(toDto(transferencia.getEntrada(), transferencia)));

        return resultado;
    }

    public EntradaDTO obtenerParaUsuario(Integer entradaId, String email) {
        Entrada entrada = entradaRepository.findById(entradaId)
                .orElseThrow(() -> new ResourceNotFoundException("Entrada no encontrada"));
        obtenerGeneralPorEmail(email);

        if (entrada.getPropietarioActualEmail() == null
                || !entrada.getPropietarioActualEmail().equals(email)) {
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
        return toDto(entrada, null);
    }

    private EntradaDTO toDto(Entrada entrada, Transferencia transferenciaPendiente) {
        Evento evento = entrada.getEvento();
        Sector sector = entrada.getSector();

        return new EntradaDTO(
                entrada.getId(),
                evento.getId(),
                evento.getEquipoLocal().getNombreEquipo(),
                evento.getEquipoVisitante().getNombreEquipo(),
                evento.getFechaEvento(),
                evento.getHoraEvento(),
                evento.getEstadio().getNombreEstadio(),
                sector.getCodigo(),
                entrada.getCosto(),
                entrada.getNumeroAsiento(),
                entrada.getEstado(),
                entrada.getCodigoQR(),
                entrada.getConsumida(),
                entrada.getFechaConsumo(),
                transferenciaPendiente == null ? null : transferenciaPendiente.getId(),
                transferenciaPendiente == null ? null : transferenciaPendiente.getRemitente().getEmail()
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
