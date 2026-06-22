package com.mundial2026.entity;

import com.mundial2026.entity.usuario.General;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "transferencia")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transferencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "remitente_id", nullable = false)
    private General remitente;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destinatario_id", nullable = false)
    private General destinatario;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaTrans = LocalDateTime.now();
    
    private LocalTime horaTrans = LocalTime.now();
    
    @Column(nullable = false)
    private Integer cantTransf;
    
    @Column(nullable = false)
    private Boolean aprobacion = false;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "transferencia_entrada",
        joinColumns = @JoinColumn(name = "transferencia_id"),
        inverseJoinColumns = @JoinColumn(name = "entrada_id")
    )
    private Set<Entrada> entradas = new HashSet<>();
}
