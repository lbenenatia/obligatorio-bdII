package com.mundial2026.entity;

import com.mundial2026.entity.usuario.Funcionario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "dispositivo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dispositivo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(unique = true, nullable = false, length = 100)
    private String dispositivoId;
    
    @Column(nullable = false)
    private Boolean autorizado = false;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();
}
