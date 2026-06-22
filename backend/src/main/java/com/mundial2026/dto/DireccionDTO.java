package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DireccionDTO {
    private String calle;
    private Integer nroDireccion;
    private String localidad;
    private String paisDireccion;
    private String codigoPostal;
}
