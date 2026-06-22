package com.mundial2026.entity;

import com.mundial2026.entity.usuario.Funcionario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "funcionario_sector")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuncionarioSector {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario funcionario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sector_id", nullable = false)
    private Sector sector;

    @Column(nullable = false, updatable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();
}
