package com.mundial2026.controller;

import com.mundial2026.entity.Dispositivo;
import com.mundial2026.entity.Evento;
import com.mundial2026.entity.FuncionarioSector;
import com.mundial2026.entity.Sector;
import com.mundial2026.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping("/mi-sector")
    public ResponseEntity<List<Sector>> miSector() {
        return ResponseEntity.ok(funcionarioService.obtenerSectoresAsignados(emailAutenticado()));
    }

    @GetMapping("/mi-evento")
    public ResponseEntity<Evento> miEvento() {
        return ResponseEntity.ok(funcionarioService.obtenerEventoActual(emailAutenticado()));
    }

    @GetMapping("/mi-dispositivo")
    public ResponseEntity<Dispositivo> miDispositivo() {
        return ResponseEntity.ok(funcionarioService.obtenerDispositivo(emailAutenticado()));
    }

    @PostMapping("/{funcionarioId}/sectores/{sectorId}")
    public ResponseEntity<FuncionarioSector> asignarSector(
            @PathVariable Integer funcionarioId, @PathVariable Integer sectorId) {
        return ResponseEntity.ok(funcionarioService.asignarSector(funcionarioId, sectorId));
    }

    @DeleteMapping("/{funcionarioId}/sectores/{sectorId}")
    public ResponseEntity<Void> quitarSector(
            @PathVariable Integer funcionarioId, @PathVariable Integer sectorId) {
        funcionarioService.quitarSector(funcionarioId, sectorId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{funcionarioId}/dispositivo")
    public ResponseEntity<Dispositivo> autorizarDispositivo(
            @PathVariable Integer funcionarioId, @RequestParam String dispositivoId) {
        return ResponseEntity.ok(funcionarioService.autorizarDispositivo(funcionarioId, dispositivoId));
    }

    @DeleteMapping("/{funcionarioId}/dispositivo")
    public ResponseEntity<Void> revocarDispositivo(@PathVariable Integer funcionarioId) {
        funcionarioService.revocarDispositivo(funcionarioId);
        return ResponseEntity.noContent().build();
    }

    private String emailAutenticado() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
