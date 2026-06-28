package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuncionarioResumenDTO {
    private Integer id;
    private String nombre;
    private String apellido;
    private String email;
    private String legajo;
    private String nroVinculacion;
    private Boolean dispositivoAutorizado;
}
