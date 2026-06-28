package com.mundial2026.entity;

import com.mundial2026.entity.usuario.Funcionario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "funcionario_sector")
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(FuncionarioSectorId.class)
public class FuncionarioSector {

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario funcionario;

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sector_id", nullable = false)
    private Sector sector;
}
