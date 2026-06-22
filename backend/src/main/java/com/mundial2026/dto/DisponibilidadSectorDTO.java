package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DisponibilidadSectorDTO {
    private Character codigo;
    private Integer disponibles;
    private BigDecimal precio;
    private Integer capMax;
}
