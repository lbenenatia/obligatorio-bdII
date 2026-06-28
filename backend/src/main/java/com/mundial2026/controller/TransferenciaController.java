package com.mundial2026.controller;

import com.mundial2026.dto.TransferenciaDTO;
import com.mundial2026.dto.TransferenciaRequest;
import com.mundial2026.entity.usuario.General;
import com.mundial2026.entity.usuario.Usuario;
import com.mundial2026.exception.InvalidOperationException;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.repository.UsuarioRepository;
import com.mundial2026.service.TransferenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transferencias")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TransferenciaController {

    @Autowired
    private TransferenciaService transferenciaService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<List<TransferenciaDTO>> crear(@RequestBody TransferenciaRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        General remitente = obtenerGeneralPorEmail(email);
        General destinatario = obtenerGeneralPorEmail(request.getDestinatarioEmail());

        var transferencias = transferenciaService.crearTransferencia(
                remitente.getId(),
                destinatario.getId(),
                request.getEntradaIds().size(),
                request.getEntradaIds());

        return ResponseEntity.ok(transferencias.stream()
                .map(transferenciaService::toDto)
                .collect(Collectors.toList()));
    }

    @GetMapping
    public ResponseEntity<List<TransferenciaDTO>> listarTodas() {
        return ResponseEntity.ok(transferenciaService.listarTodas());
    }

    @GetMapping("/mias")
    public ResponseEntity<List<TransferenciaDTO>> misTransferencias() {
        return ResponseEntity.ok(transferenciaService.misTransferencias(emailAutenticado()));
    }

    @PostMapping("/{id}/aceptar")
    public ResponseEntity<TransferenciaDTO> aceptar(@PathVariable Integer id) {
        var transferencia = transferenciaService.aceptarTransferencia(id, emailAutenticado());
        return ResponseEntity.ok(transferenciaService.toDto(transferencia));
    }

    @PostMapping("/{id}/rechazar")
    public ResponseEntity<TransferenciaDTO> rechazar(@PathVariable Integer id) {
        var transferencia = transferenciaService.rechazarTransferencia(id, emailAutenticado());
        return ResponseEntity.ok(transferenciaService.toDto(transferencia));
    }

    private String emailAutenticado() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    private General obtenerGeneralPorEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + email));
        if (!(usuario instanceof General)) {
            throw new InvalidOperationException("El usuario " + email + " no es un espectador");
        }
        return (General) usuario;
    }
}
