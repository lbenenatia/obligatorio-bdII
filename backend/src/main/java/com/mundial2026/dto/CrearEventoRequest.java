package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearEventoRequest {
    private Integer estadioId;
    private String equipoLocalNombre;
    private String equipoVisitanteNombre;
    private LocalDate fechaEvento;
    private LocalTime horaEvento;
    // Override opcional de capacidad/precio por sector para este evento puntual.
    // Si no se manda (o un sector no aparece), se usan los valores del Sector del estadio.
    private List<SectorRequest> sectores;
}
