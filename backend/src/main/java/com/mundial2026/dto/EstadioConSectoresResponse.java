package com.mundial2026.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadioConSectoresResponse {
    private Integer id;
    private String nombreEstadio;
    private String ubicacion;
    private List<SectorRequest> sectores;
}
