package com.mundial2026.entity.usuario;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mundial2026.entity.Direccion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo_usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @JsonIgnore
    @Column(nullable = false, length = 255)
    private String contrasena;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String apellido;

    @Column(nullable = false, length = 50)
    private String paisDocumento;

    @Column(unique = true, nullable = false, length = 50)
    private String nroDocumento;

    @Column(nullable = false, length = 50)
    private String documentoTipo;

    @Column(length = 255)
    private String telefonos;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "direccion_id")
    private Direccion direccion;
}
