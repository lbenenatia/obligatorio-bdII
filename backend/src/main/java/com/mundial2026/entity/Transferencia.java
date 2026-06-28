package com.mundial2026.entity;

import com.mundial2026.entity.usuario.General;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.LocalTime;

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
    @JoinColumn(name = "entrada_id", nullable = false)
    private Entrada entrada;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "remitente_id", nullable = false)
    private General remitente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destinatario_id", nullable = false)
    private General destinatario;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaTransferencia = LocalDateTime.now();

    private LocalTime horaTransferencia = LocalTime.now();

    @Column(nullable = false)
    private Integer cantTransferida;

    // NULL: pendiente, TRUE: aceptada por el destinatario, FALSE: rechazada
    private Boolean aprobacion;
}
