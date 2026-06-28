package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearEventoRequest {
    private Integer estadioId;
    private String equipoLocalNombre;
    private String equipoVisitanteNombre;
    private LocalDate fechaEvento;
    private LocalTime horaEvento;
}
