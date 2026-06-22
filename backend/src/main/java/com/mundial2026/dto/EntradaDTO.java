package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntradaDTO {
    private Integer id;
    private Integer eventoId;
    private String equipoLocal;
    private String equipoVisitante;
    private LocalDate fechaEvento;
    private LocalTime horaEvento;
    private String estadioNombre;
    private Character sectorCodigo;
    private BigDecimal precio;
    private Integer numeroAsiento;
    private String estado;
    private String codigoQR;
    private Boolean consumida;
    private LocalDateTime fechaConsumo;
}
