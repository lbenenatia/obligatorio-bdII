package com.mundial2026.controller;

import com.mundial2026.dto.EntradaDTO;
import com.mundial2026.service.EntradaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/entradas")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EntradaController {

    @Autowired
    private EntradaService entradaService;

    @GetMapping("/mias")
    public ResponseEntity<List<EntradaDTO>> misEntradas() {
        return ResponseEntity.ok(entradaService.misEntradas(emailAutenticado()));
    }

    @GetMapping("/validadas/mias")
    public ResponseEntity<List<EntradaDTO>> misValidadas() {
        return ResponseEntity.ok(entradaService.misValidadas(emailAutenticado()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntradaDTO> obtener(@PathVariable Integer id) {
        return ResponseEntity.ok(entradaService.obtenerParaUsuario(id, emailAutenticado()));
    }

    private String emailAutenticado() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
