package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroGeneralRequest {
    private String email;
    private String contrasena;
    private String nombre;
    private String apellido;
    private String paisDocumento;
    private String nroDocumento;
    private String documentoTipo;
    private String localidad;
    private String calle;
    private String paisDireccion;
    private Integer nroDireccion;
    private String codigoPostal;
    private List<String> telefonos;
}
