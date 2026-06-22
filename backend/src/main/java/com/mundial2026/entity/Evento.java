package com.mundial2026.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "evento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "estadio_id", nullable = false)
    private Estadio estadio;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "equipo_local_id", nullable = false)
    private Equipo equipoLocal;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "equipo_visitante_id", nullable = false)
    private Equipo equipoVisitante;
    
    @Column(nullable = false)
    private LocalDate fechaEvento;
    
    @Column(nullable = false)
    private LocalTime horaEvento;
    
    @Column(nullable = false, length = 50)
    private String estado = "PENDIENTE"; // PENDIENTE, APROBADO, CANCELADO
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();
}
