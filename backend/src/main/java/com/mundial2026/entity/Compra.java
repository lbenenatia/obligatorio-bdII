package com.mundial2026.entity;

import com.mundial2026.entity.usuario.General;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "compra")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Compra {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    private General usuario;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaCompra = LocalDateTime.now();
    
    @Column(nullable = false)
    private Integer cantEntradas;
    
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal montoTotal;
    
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal costo;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal comision = new BigDecimal("10");
    
    @Column(nullable = false, length = 50)
    private String estado = "PENDIENTE"; // PENDIENTE, CONFIRMADA, PAGA
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "compra_entrada",
        joinColumns = @JoinColumn(name = "compra_id"),
        inverseJoinColumns = @JoinColumn(name = "entrada_id")
    )
    private Set<Entrada> entradas = new HashSet<>();
}
