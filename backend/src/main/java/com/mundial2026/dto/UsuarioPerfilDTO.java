package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioPerfilDTO {
    private Integer id;
    private String email;
    private String nombre;
    private String apellido;
    private String rol;
    private String paisDocumento;
    private String nroDocumento;
    private String documentoTipo;
    private String telefonos;
    private DireccionDTO direccion;
}
