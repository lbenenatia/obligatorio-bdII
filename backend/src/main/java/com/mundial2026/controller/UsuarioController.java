package com.mundial2026.controller;

import com.mundial2026.dto.DireccionDTO;
import com.mundial2026.dto.UsuarioGeneralResumenDTO;
import com.mundial2026.dto.UsuarioPerfilDTO;
import com.mundial2026.dto.UsuarioResumenDTO;
import com.mundial2026.entity.Direccion;
import com.mundial2026.entity.usuario.Administrador;
import com.mundial2026.entity.usuario.Funcionario;
import com.mundial2026.entity.usuario.General;
import com.mundial2026.entity.usuario.Telefono;
import com.mundial2026.entity.usuario.Usuario;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.repository.GeneralRepository;
import com.mundial2026.repository.UsuarioRepository;
import com.mundial2026.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UsuarioController {

    @Autowired
    private GeneralRepository generalRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/me")
    public ResponseEntity<UsuarioPerfilDTO> me() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        String rol = "GENERAL";
        if (usuario instanceof Administrador) {
            rol = "ADMINISTRADOR";
        } else if (usuario instanceof Funcionario) {
            rol = "FUNCIONARIO";
        }

        DireccionDTO direccionDTO = null;
        Direccion direccion = usuario.getDireccion();
        if (direccion != null) {
            direccionDTO = new DireccionDTO(
                    direccion.getCalle(), direccion.getNroDireccion(), direccion.getLocalidad(),
                    direccion.getPaisDireccion(), direccion.getCodigoPostal());
        }

        List<String> telefonos = usuario.getTelefonos().stream()
                .map(Telefono::getNumero)
                .collect(Collectors.toList());

        UsuarioPerfilDTO perfil = new UsuarioPerfilDTO(
                usuario.getId(), usuario.getEmail(), usuario.getNombre(), usuario.getApellido(), rol,
                usuario.getPaisDocumento(), usuario.getNroDocumento(), usuario.getDocumentoTipo(),
                telefonos, direccionDTO);

        return ResponseEntity.ok(perfil);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<UsuarioResumenDTO>> buscar(@RequestParam String email) {
        List<UsuarioResumenDTO> resultado = generalRepository.findByEmailContainingIgnoreCase(email).stream()
                .map(this::toResumen)
                .collect(Collectors.toList());
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> contar() {
        return ResponseEntity.ok(usuarioRepository.count());
    }

    @GetMapping("/generales")
    public ResponseEntity<List<UsuarioGeneralResumenDTO>> listarGenerales() {
        List<UsuarioGeneralResumenDTO> resultado = usuarioService.listarGenerales().stream()
                .map(this::toGeneralResumen)
                .collect(Collectors.toList());
        return ResponseEntity.ok(resultado);
    }

    @PutMapping("/{id}/verificacion")
    public ResponseEntity<Void> actualizarVerificacion(
            @PathVariable Integer id, @RequestParam boolean verificado) {
        usuarioService.actualizarVerificacion(id, verificado);
        return ResponseEntity.noContent().build();
    }

    private UsuarioResumenDTO toResumen(General usuario) {
        return new UsuarioResumenDTO(usuario.getId(), usuario.getNombre(), usuario.getApellido(), usuario.getEmail());
    }

    private UsuarioGeneralResumenDTO toGeneralResumen(General usuario) {
        return new UsuarioGeneralResumenDTO(
                usuario.getId(), usuario.getNombre(), usuario.getApellido(), usuario.getEmail(),
                usuario.getNroDocumento(), usuario.getVerificacion(), usuario.getFechaRegistro());
    }
}
