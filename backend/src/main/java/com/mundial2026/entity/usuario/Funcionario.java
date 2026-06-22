package com.mundial2026.entity.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "funcionario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("FUNCIONARIO")
public class Funcionario extends Usuario {
    
    @Column(unique = true, nullable = false, length = 50)
    private String legajo;
    
    @Column(nullable = false)
    private LocalDateTime fechaAsigCargo = LocalDateTime.now();
    
    @Column(nullable = false)
    private Boolean verificacion = false;
}
