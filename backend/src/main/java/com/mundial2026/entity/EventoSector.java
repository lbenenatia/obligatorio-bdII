package com.mundial2026.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

// Capacidad/precio efectivos de un Sector para un Evento puntual.
// Se completan al crear el evento (con el override del admin o, si no manda nada, los valores del Sector del estadio).
@Entity
@Table(name = "evento_sector")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventoSector {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sector_id", nullable = false)
    private Sector sector;

    @Column(name = "cap_max", nullable = false)
    private Integer capMax;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
}
