package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferenciaRequest {
    private String destinatarioEmail;
    private Set<Integer> entradaIds;
}
