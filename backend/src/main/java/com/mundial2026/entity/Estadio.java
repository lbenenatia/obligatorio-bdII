package com.mundial2026.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estadio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Estadio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, length = 100)
    private String nombreEstadio;
    
    @Column(nullable = false, length = 255)
    private String ubicacion;
}
