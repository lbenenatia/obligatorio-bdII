package com.mundial2026.controller;

import com.mundial2026.dto.EntradaDTO;
import com.mundial2026.dto.ValidacionQRResponse;
import com.mundial2026.exception.InvalidOperationException;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.service.EntradaService;
import com.mundial2026.service.QRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/qr")
@CrossOrigin(origins = "*", maxAge = 3600)
public class QRController {

    @Autowired
    private QRService qrService;

    @Autowired
    private EntradaService entradaService;

    @GetMapping("/{entradaId}/imagen")
    public ResponseEntity<String> obtenerImagen(@PathVariable Integer entradaId) {
        try {
            String imagenBase64 = qrService.obtenerImagenQR(entradaId);
            return ResponseEntity.ok(imagenBase64);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{codigoQR}/validar")
    public ResponseEntity<ValidacionQRResponse> validarQR(@PathVariable String codigoQR) {
        String funcionarioEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            var entrada = qrService.consumirQR(codigoQR, funcionarioEmail);
            return ResponseEntity.ok(new ValidacionQRResponse("VALIDA", entradaService.toDto(entrada)));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.ok(new ValidacionQRResponse("INVALIDA", null));
        } catch (InvalidOperationException e) {
            return ResponseEntity.ok(new ValidacionQRResponse("USADA", null));
        }
    }

    @PostMapping("/generar/{entradaId}")
    public ResponseEntity<EntradaDTO> generarQR(@PathVariable Integer entradaId) {
        var entrada = qrService.generarQR(entradaId);
        return ResponseEntity.ok(entradaService.toDto(entrada));
    }
}
