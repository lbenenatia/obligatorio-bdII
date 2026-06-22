package com.mundial2026.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "direccion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Direccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String calle;

    @Column(nullable = false)
    private Integer nroDireccion;

    @Column(nullable = false, length = 100)
    private String localidad;

    @Column(nullable = false, length = 50)
    private String paisDireccion;

    @Column(length = 10)
    private String codigoPostal;
}
