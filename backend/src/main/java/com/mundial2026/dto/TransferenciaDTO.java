package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferenciaDTO {
    private Integer id;
    private Integer entradaId;
    private String equipoLocal;
    private String equipoVisitante;
    private LocalDate fechaEvento;
    private Character sectorCodigo;
    private String remitenteEmail;
    private String destinatarioEmail;
    private String estado; // PENDIENTE, ACEPTADA, RECHAZADA
    private LocalDateTime fechaTransferencia;
}
