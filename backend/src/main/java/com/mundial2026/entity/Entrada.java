package com.mundial2026.entity;

import com.mundial2026.entity.usuario.Funcionario;
import com.mundial2026.entity.usuario.General;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "entrada")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entrada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sector_id", nullable = false)
    private Sector sector;

    private Integer numeroAsiento;

    @Column(nullable = false, length = 50)
    private String estado = "DISPONIBLE"; // DISPONIBLE, VENDIDA, TRANSFERIDA, CONSUMIDA

    @Column(nullable = false, updatable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();

    // QR: se regenera cada ~30s mientras la app está en primer plano
    @Column(name = "codigo_qr", columnDefinition = "TEXT")
    private String codigoQR;

    @Column(name = "fecha_generacion_qr")
    private LocalDateTime fechaGeneracionQR;

    @Column(nullable = false)
    private Boolean consumida = false;

    private LocalDateTime fechaConsumo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "validado_por")
    private Funcionario validadoPor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dispositivo_id")
    private Dispositivo dispositivo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "propietario_actual_id")
    private General propietarioActual;
}
