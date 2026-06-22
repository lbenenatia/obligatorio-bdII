package com.mundial2026.controller;

import com.mundial2026.entity.Compra;
import com.mundial2026.entity.usuario.General;
import com.mundial2026.entity.usuario.Usuario;
import com.mundial2026.exception.InvalidOperationException;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.exception.UnauthorizedException;
import com.mundial2026.repository.UsuarioRepository;
import com.mundial2026.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/compras")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CompraController {

    @Autowired
    private CompraService compraService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<Compra>> listarTodas() {
        return ResponseEntity.ok(compraService.listarTodas());
    }

    @PostMapping
    public ResponseEntity<Compra> crear(
            @RequestParam Integer eventoId,
            @RequestParam Character codigoSector,
            @RequestParam Integer cantEntradas) {
        General comprador = obtenerGeneralAutenticado();
        return ResponseEntity.ok(
            compraService.crearCompra(comprador.getId(), eventoId, codigoSector, cantEntradas)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compra> obtener(@PathVariable Integer id) {
        Compra compra = compraService.obtenerCompra(id);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!compra.getUsuario().getEmail().equals(email)) {
            throw new UnauthorizedException("La compra no pertenece al usuario autenticado");
        }
        return ResponseEntity.ok(compra);
    }

    @GetMapping("/mias")
    public ResponseEntity<List<Compra>> obtenerMias() {
        General usuario = obtenerGeneralAutenticado();
        return ResponseEntity.ok(compraService.obtenerComprasPorUsuario(usuario.getId()));
    }

    private General obtenerGeneralAutenticado() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        if (!(usuario instanceof General)) {
            throw new InvalidOperationException("El usuario autenticado no es un espectador");
        }
        return (General) usuario;
    }

    @PostMapping("/{id}/confirmar")
    public ResponseEntity<String> confirmar(@PathVariable Integer id) {
        compraService.confirmarCompra(id);
        return ResponseEntity.ok("Compra confirmada");
    }

    @PostMapping("/{id}/pagar")
    public ResponseEntity<String> pagar(@PathVariable Integer id) {
        compraService.pagarCompra(id);
        return ResponseEntity.ok("Compra pagada");
    }
}
