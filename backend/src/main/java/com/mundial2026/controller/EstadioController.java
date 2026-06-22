package com.mundial2026.controller;

import com.mundial2026.dto.EstadioConSectoresRequest;
import com.mundial2026.dto.EstadioConSectoresResponse;
import com.mundial2026.service.EstadioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/estadios")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EstadioController {

    @Autowired
    private EstadioService estadioService;

    @GetMapping
    public ResponseEntity<List<EstadioConSectoresResponse>> obtenerTodos() {
        return ResponseEntity.ok(estadioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstadioConSectoresResponse> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(estadioService.obtener(id));
    }

    @PostMapping
    public ResponseEntity<EstadioConSectoresResponse> crear(@RequestBody EstadioConSectoresRequest request) {
        return ResponseEntity.ok(estadioService.crear(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EstadioConSectoresResponse> actualizar(
            @PathVariable Integer id, @RequestBody EstadioConSectoresRequest request) {
        return ResponseEntity.ok(estadioService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        estadioService.eliminar(id);
        return ResponseEntity.ok().build();
    }
}
