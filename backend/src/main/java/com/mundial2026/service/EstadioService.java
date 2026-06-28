package com.mundial2026.service;

import com.mundial2026.dto.EstadioConSectoresRequest;
import com.mundial2026.dto.EstadioConSectoresResponse;
import com.mundial2026.dto.SectorRequest;
import com.mundial2026.entity.Estadio;
import com.mundial2026.entity.Sector;
import com.mundial2026.exception.InvalidOperationException;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.repository.EstadioRepository;
import com.mundial2026.repository.EventoRepository;
import com.mundial2026.repository.SectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EstadioService {

    @Autowired
    private EstadioRepository estadioRepository;

    @Autowired
    private SectorRepository sectorRepository;

    @Autowired
    private EventoRepository eventoRepository;

    public EstadioConSectoresResponse crear(EstadioConSectoresRequest request) {
        Estadio estadio = new Estadio();
        estadio.setNombreEstadio(request.getNombreEstadio());
        estadio.setUbicacion(request.getUbicacion());
        estadio = estadioRepository.save(estadio);

        guardarSectores(estadio, request.getSectores());

        return toResponse(estadio);
    }

    public EstadioConSectoresResponse actualizar(Integer id, EstadioConSectoresRequest request) {
        Estadio estadio = obtenerEstadio(id);
        estadio.setNombreEstadio(request.getNombreEstadio());
        estadio.setUbicacion(request.getUbicacion());
        estadio = estadioRepository.save(estadio);

        guardarSectores(estadio, request.getSectores());

        return toResponse(estadio);
    }

    public EstadioConSectoresResponse obtener(Integer id) {
        return toResponse(obtenerEstadio(id));
    }

    public List<EstadioConSectoresResponse> listarTodos() {
        return estadioRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void eliminar(Integer id) {
        Estadio estadio = obtenerEstadio(id);
        if (!eventoRepository.findByEstadio(estadio).isEmpty()) {
            throw new InvalidOperationException("No se puede eliminar un estadio con eventos asociados");
        }
        estadioRepository.delete(estadio);
    }

    private void guardarSectores(Estadio estadio, List<SectorRequest> sectoresRequest) {
        if (sectoresRequest == null) {
            return;
        }
        for (SectorRequest sectorRequest : sectoresRequest) {
            if (sectorRequest.getCapMax() == null || sectorRequest.getCapMax() <= 0) {
                continue;
            }
            Sector sector = sectorRepository
                    .findByEstadioAndCodigo(estadio, sectorRequest.getCodigo())
                    .orElseGet(Sector::new);
            sector.setEstadio(estadio);
            sector.setCodigo(sectorRequest.getCodigo());
            sector.setCapMax(sectorRequest.getCapMax());
            sector.setPrecio(sectorRequest.getPrecio());
            sectorRepository.save(sector);
        }
    }

    private Estadio obtenerEstadio(Integer id) {
        return estadioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estadio no encontrado"));
    }

    private EstadioConSectoresResponse toResponse(Estadio estadio) {
        List<SectorRequest> sectores = sectorRepository.findByEstadio(estadio).stream()
                .map(s -> new SectorRequest(s.getId(), s.getCodigo(), s.getCapMax(), s.getPrecio()))
                .collect(Collectors.toList());
        return new EstadioConSectoresResponse(
                estadio.getId(), estadio.getNombreEstadio(), estadio.getUbicacion(), sectores);
    }
}
