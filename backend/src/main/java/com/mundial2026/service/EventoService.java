package com.mundial2026.service;

import com.mundial2026.dto.CrearEventoRequest;
import com.mundial2026.dto.DisponibilidadSectorDTO;
import com.mundial2026.dto.SectorRequest;
import com.mundial2026.entity.Entrada;
import com.mundial2026.entity.Equipo;
import com.mundial2026.entity.Estadio;
import com.mundial2026.entity.Evento;
import com.mundial2026.entity.EventoSector;
import com.mundial2026.entity.Sector;
import com.mundial2026.repository.EntradaRepository;
import com.mundial2026.repository.EquipoRepository;
import com.mundial2026.repository.EstadioRepository;
import com.mundial2026.repository.EventoRepository;
import com.mundial2026.repository.EventoSectorRepository;
import com.mundial2026.repository.SectorRepository;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.exception.InvalidOperationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private EstadioRepository estadioRepository;

    @Autowired
    private EquipoRepository equipoRepository;

    @Autowired
    private SectorRepository sectorRepository;

    @Autowired
    private EntradaRepository entradaRepository;

    @Autowired
    private EventoSectorRepository eventoSectorRepository;

    public Evento crearEvento(CrearEventoRequest request) {
        Estadio estadio = estadioRepository.findById(request.getEstadioId())
                .orElseThrow(() -> new ResourceNotFoundException("Estadio no encontrado"));

        Equipo equipoLocal = obtenerOCrearEquipo(request.getEquipoLocalNombre());
        Equipo equipoVisitante = obtenerOCrearEquipo(request.getEquipoVisitanteNombre());

        validarEquiposYFecha(equipoLocal, equipoVisitante, request.getFechaEvento());

        Evento evento = new Evento();
        evento.setEstadio(estadio);
        evento.setEquipoLocal(equipoLocal);
        evento.setEquipoVisitante(equipoVisitante);
        evento.setFechaEvento(request.getFechaEvento());
        evento.setHoraEvento(request.getHoraEvento());

        evento = eventoRepository.save(evento);
        guardarSectoresEvento(evento, estadio, request.getSectores());
        generarEntradas(evento);

        return evento;
    }

    public Evento actualizarEvento(Integer id, CrearEventoRequest request) {
        Evento evento = obtenerEvento(id);

        Estadio nuevoEstadio = estadioRepository.findById(request.getEstadioId())
                .orElseThrow(() -> new ResourceNotFoundException("Estadio no encontrado"));
        Equipo equipoLocal = obtenerOCrearEquipo(request.getEquipoLocalNombre());
        Equipo equipoVisitante = obtenerOCrearEquipo(request.getEquipoVisitanteNombre());

        validarEquiposYFecha(equipoLocal, equipoVisitante, request.getFechaEvento());

        boolean cambioEstadio = !evento.getEstadio().getId().equals(nuevoEstadio.getId());
        boolean cambioSectores = !cambioEstadio && haySectoresDistintos(evento, request.getSectores());

        if (cambioEstadio || cambioSectores) {
            long vendidas = entradaRepository.countByEventoAndEstadoNot(evento, "DISPONIBLE");
            if (vendidas > 0) {
                throw new InvalidOperationException("No se puede cambiar el estadio o los sectores de un evento con entradas vendidas");
            }
        }

        evento.setEstadio(nuevoEstadio);
        evento.setEquipoLocal(equipoLocal);
        evento.setEquipoVisitante(equipoVisitante);
        evento.setFechaEvento(request.getFechaEvento());
        evento.setHoraEvento(request.getHoraEvento());
        evento = eventoRepository.save(evento);

        if (cambioEstadio || cambioSectores) {
            entradaRepository.deleteAll(entradaRepository.findByEvento(evento));
            eventoSectorRepository.deleteAll(eventoSectorRepository.findByEvento(evento));
            guardarSectoresEvento(evento, nuevoEstadio, request.getSectores());
            generarEntradas(evento);
        }

        return evento;
    }

    public void eliminarEvento(Integer id) {
        Evento evento = obtenerEvento(id);
        long vendidas = entradaRepository.countByEventoAndEstadoNot(evento, "DISPONIBLE");
        if (vendidas > 0) {
            throw new InvalidOperationException("No se puede eliminar un evento con entradas vendidas");
        }
        entradaRepository.deleteAll(entradaRepository.findByEvento(evento));
        eventoSectorRepository.deleteAll(eventoSectorRepository.findByEvento(evento));
        eventoRepository.delete(evento);
    }

    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    public List<DisponibilidadSectorDTO> obtenerDisponibilidad(Integer eventoId) {
        Evento evento = obtenerEvento(eventoId);
        List<EventoSector> eventoSectores = eventoSectorRepository.findByEvento(evento);

        List<DisponibilidadSectorDTO> resultado = new ArrayList<>();
        for (EventoSector eventoSector : eventoSectores) {
            long disponibles = entradaRepository.countByEventoAndSectorAndEstado(evento, eventoSector.getSector(), "DISPONIBLE");
            resultado.add(new DisponibilidadSectorDTO(
                    eventoSector.getSector().getCodigo(), (int) disponibles, eventoSector.getPrecio(), eventoSector.getCapMax()));
        }
        return resultado;
    }

    public Evento obtenerEvento(Integer id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento no encontrado"));
    }

    public List<Evento> obtenerPorEstadio(Integer estadioId) {
        Estadio estadio = estadioRepository.findById(estadioId)
                .orElseThrow(() -> new ResourceNotFoundException("Estadio no encontrado"));
        return eventoRepository.findByEstadio(estadio);
    }

    public List<Evento> obtenerEventosPendientes() {
        return eventoRepository.findByEstadoAndFechaEventoAfter("PENDIENTE", LocalDate.now());
    }

    public void aprobarEvento(Integer eventoId) {
        Evento evento = obtenerEvento(eventoId);
        evento.setEstado("APROBADO");
        eventoRepository.save(evento);
    }

    public void cancelarEvento(Integer eventoId) {
        Evento evento = obtenerEvento(eventoId);
        evento.setEstado("CANCELADO");
        eventoRepository.save(evento);
    }

    private void validarEquiposYFecha(Equipo equipoLocal, Equipo equipoVisitante, LocalDate fechaEvento) {
        if (equipoLocal.getId().equals(equipoVisitante.getId())) {
            throw new InvalidOperationException("Los equipos local y visitante no pueden ser iguales");
        }
        if (fechaEvento.isBefore(LocalDate.now())) {
            throw new InvalidOperationException("La fecha del evento no puede ser en el pasado");
        }
    }

    // Compara los overrides recibidos contra los valores efectivos actuales del evento.
    // Solo se considera "cambio real" si algun sector pide un capMax/precio distinto al actual
    // (evita disparar el borrado/regeneracion de entradas en una edicion que no toca sectores).
    private boolean haySectoresDistintos(Evento evento, List<SectorRequest> overrides) {
        if (overrides == null || overrides.isEmpty()) {
            return false;
        }
        List<EventoSector> actuales = eventoSectorRepository.findByEvento(evento);
        for (SectorRequest override : overrides) {
            if (override.getCodigo() == null) continue;

            EventoSector actual = actuales.stream()
                    .filter(es -> es.getSector().getCodigo().equals(override.getCodigo()))
                    .findFirst()
                    .orElse(null);
            if (actual == null) continue;

            boolean capDistinto = override.getCapMax() != null && override.getCapMax() > 0
                    && !override.getCapMax().equals(actual.getCapMax());
            boolean precioDistinto = override.getPrecio() != null
                    && override.getPrecio().compareTo(actual.getPrecio()) != 0;
            if (capDistinto || precioDistinto) {
                return true;
            }
        }
        return false;
    }

    private void guardarSectoresEvento(Evento evento, Estadio estadio, List<SectorRequest> overrides) {
        List<Sector> sectoresEstadio = sectorRepository.findByEstadio(estadio);

        for (Sector sector : sectoresEstadio) {
            SectorRequest override = overrides == null ? null : overrides.stream()
                    .filter(s -> s.getCodigo() != null && s.getCodigo().equals(sector.getCodigo()))
                    .findFirst()
                    .orElse(null);

            Integer capMax = (override != null && override.getCapMax() != null && override.getCapMax() > 0)
                    ? Math.min(override.getCapMax(), sector.getCapMax()) : sector.getCapMax();
            var precio = (override != null && override.getPrecio() != null)
                    ? override.getPrecio() : sector.getPrecio();

            EventoSector eventoSector = new EventoSector();
            eventoSector.setEvento(evento);
            eventoSector.setSector(sector);
            eventoSector.setCapMax(capMax);
            eventoSector.setPrecio(precio);
            eventoSectorRepository.save(eventoSector);
        }
    }

    private void generarEntradas(Evento evento) {
        List<EventoSector> eventoSectores = eventoSectorRepository.findByEvento(evento);
        List<Entrada> nuevasEntradas = new ArrayList<>();

        for (EventoSector eventoSector : eventoSectores) {
            for (int numero = 1; numero <= eventoSector.getCapMax(); numero++) {
                Entrada entrada = new Entrada();
                entrada.setEvento(evento);
                entrada.setSector(eventoSector.getSector());
                entrada.setNumeroAsiento(numero);
                entrada.setEstado("DISPONIBLE");
                nuevasEntradas.add(entrada);
            }
        }

        entradaRepository.saveAll(nuevasEntradas);
    }

    private Equipo obtenerOCrearEquipo(String nombre) {
        return equipoRepository.findByNombreEquipo(nombre)
                .orElseGet(() -> {
                    Equipo equipo = new Equipo();
                    equipo.setNombreEquipo(nombre);
                    return equipoRepository.save(equipo);
                });
    }
}
