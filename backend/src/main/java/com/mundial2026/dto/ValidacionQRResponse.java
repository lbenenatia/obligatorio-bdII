package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidacionQRResponse {
    private String resultado; // VALIDA, USADA, INVALIDA
    private EntradaDTO entrada;
}
