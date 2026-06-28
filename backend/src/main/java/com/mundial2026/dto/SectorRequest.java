package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectorRequest {
    private Integer id;
    private Character codigo;
    private Integer capMax;
    private BigDecimal precio;
}
