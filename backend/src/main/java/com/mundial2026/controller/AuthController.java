package com.mundial2026.controller;

import com.mundial2026.dto.LoginRequest;
import com.mundial2026.dto.LoginResponse;
import com.mundial2026.dto.RegistroGeneralRequest;
import com.mundial2026.entity.Direccion;
import com.mundial2026.entity.usuario.Usuario;
import com.mundial2026.entity.usuario.General;
import com.mundial2026.service.UsuarioService;
import com.mundial2026.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        if (!usuarioService.validarCredenciales(request.getEmail(), request.getContrasena())) {
            return ResponseEntity.status(401).build();
        }

        Usuario usuario = usuarioService.obtenerPorEmail(request.getEmail());
        
        // Determinar rol
        String rol = "GENERAL";
        if (usuario instanceof com.mundial2026.entity.usuario.Administrador) {
            rol = "ADMINISTRADOR";
        } else if (usuario instanceof com.mundial2026.entity.usuario.Funcionario) {
            rol = "FUNCIONARIO";
        }

        String token = jwtProvider.generateToken(usuario.getEmail(), rol);
        
        LoginResponse response = new LoginResponse(token, usuario.getEmail(), rol, usuario.getId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/registro/espectador")
    public ResponseEntity<String> registroEspectador(@RequestBody RegistroGeneralRequest request) {
        General general = new General();
        general.setEmail(request.getEmail());
        general.setContrasena(request.getContrasena());
        general.setNombre(request.getNombre());
        general.setApellido(request.getApellido());
        general.setPaisDocumento(request.getPaisDocumento());
        general.setNroDocumento(request.getNroDocumento());
        general.setDocumentoTipo(request.getDocumentoTipo());

        Direccion direccion = new Direccion();
        direccion.setCalle(request.getCalle());
        direccion.setNroDireccion(request.getNroDireccion());
        direccion.setLocalidad(request.getLocalidad());
        direccion.setPaisDireccion(request.getPaisDireccion());
        direccion.setCodigoPostal(request.getCodigoPostal());
        general.setDireccion(direccion);

        General registrado = usuarioService.crearEspectador(general, request.getTelefonos());
        return ResponseEntity.ok("Espectador registrado exitosamente con ID: " + registrado.getId());
    }

    @GetMapping("/validate/{token}")
    public ResponseEntity<Boolean> validarToken(@PathVariable String token) {
        return ResponseEntity.ok(jwtProvider.validateToken(token));
    }
}
