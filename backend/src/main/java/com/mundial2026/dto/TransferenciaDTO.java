package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferenciaDTO {
    private Integer id;
    private String remitenteEmail;
    private String destinatarioEmail;
    private Integer cantTransf;
    private Boolean aprobacion;
    private List<Integer> entradaIds;
}
