package com.mundial2026.entity.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
}
