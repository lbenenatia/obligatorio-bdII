package com.mundial2026.controller;

import com.mundial2026.dto.CrearEventoRequest;
import com.mundial2026.dto.DisponibilidadSectorDTO;
import com.mundial2026.entity.Evento;
import com.mundial2026.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/eventos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping
    public ResponseEntity<List<Evento>> listar() {
        return ResponseEntity.ok(eventoService.listarTodos());
    }

    @PostMapping
    public ResponseEntity<Evento> crear(@RequestBody CrearEventoRequest request) {
        return ResponseEntity.ok(eventoService.crearEvento(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento> actualizar(@PathVariable Integer id, @RequestBody CrearEventoRequest request) {
        return ResponseEntity.ok(eventoService.actualizarEvento(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        eventoService.eliminarEvento(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(eventoService.obtenerEvento(id));
    }

    @GetMapping("/{id}/disponibilidad")
    public ResponseEntity<List<DisponibilidadSectorDTO>> disponibilidad(@PathVariable Integer id) {
        return ResponseEntity.ok(eventoService.obtenerDisponibilidad(id));
    }

    @GetMapping("/estadio/{estadioId}")
    public ResponseEntity<List<Evento>> obtenerPorEstadio(@PathVariable Integer estadioId) {
        return ResponseEntity.ok(eventoService.obtenerPorEstadio(estadioId));
    }

    @GetMapping("/pendientes")
    public ResponseEntity<List<Evento>> obtenerPendientes() {
        return ResponseEntity.ok(eventoService.obtenerEventosPendientes());
    }

    @PostMapping("/{id}/aprobar")
    public ResponseEntity<String> aprobar(@PathVariable Integer id) {
        eventoService.aprobarEvento(id);
        return ResponseEntity.ok("Evento aprobado correctamente");
    }

    @PostMapping("/{id}/cancelar")
    public ResponseEntity<String> cancelar(@PathVariable Integer id) {
        eventoService.cancelarEvento(id);
        return ResponseEntity.ok("Evento cancelado correctamente");
    }
}
