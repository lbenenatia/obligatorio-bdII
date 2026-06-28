package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioGeneralResumenDTO {
    private Integer id;
    private String nombre;
    private String apellido;
    private String email;
    private String nroDocumento;
    private Boolean verificacion;
    private LocalDateTime fechaRegistro;
}
