package com.mundial2026.service;

import com.mundial2026.dto.CrearEventoRequest;
import com.mundial2026.dto.DisponibilidadSectorDTO;
import com.mundial2026.entity.Entrada;
import com.mundial2026.entity.Equipo;
import com.mundial2026.entity.Estadio;
import com.mundial2026.entity.Evento;
import com.mundial2026.entity.Sector;
import com.mundial2026.entity.usuario.Administrador;
import com.mundial2026.repository.AdministradorRepository;
import com.mundial2026.repository.EntradaRepository;
import com.mundial2026.repository.EquipoRepository;
import com.mundial2026.repository.EstadioRepository;
import com.mundial2026.repository.EventoRepository;
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
    private AdministradorRepository administradorRepository;

    public Evento crearEvento(CrearEventoRequest request, String adminEmail) {
        Administrador admin = administradorRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Administrador no encontrado"));

        Estadio estadio = estadioRepository.findById(request.getEstadioId())
                .orElseThrow(() -> new ResourceNotFoundException("Estadio no encontrado"));

        Equipo equipoLocal = obtenerOCrearEquipo(request.getEquipoLocalNombre());
        Equipo equipoVisitante = obtenerOCrearEquipo(request.getEquipoVisitanteNombre());

        validarEquiposYFecha(equipoLocal, equipoVisitante, request.getFechaEvento());

        Evento evento = new Evento();
        evento.setAdmin(admin);
        evento.setEstadio(estadio);
        evento.setEquipoLocal(equipoLocal);
        evento.setEquipoVisitante(equipoVisitante);
        evento.setFechaEvento(request.getFechaEvento());
        evento.setHoraEvento(request.getHoraEvento());

        evento = eventoRepository.save(evento);
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

        if (cambioEstadio) {
            long vendidas = entradaRepository.countByEventoAndEstadoNot(evento, "DISPONIBLE");
            if (vendidas > 0) {
                throw new InvalidOperationException("No se puede cambiar el estadio de un evento con entradas vendidas");
            }
        }

        evento.setEstadio(nuevoEstadio);
        evento.setEquipoLocal(equipoLocal);
        evento.setEquipoVisitante(equipoVisitante);
        evento.setFechaEvento(request.getFechaEvento());
        evento.setHoraEvento(request.getHoraEvento());
        evento = eventoRepository.save(evento);

        if (cambioEstadio) {
            entradaRepository.deleteAll(entradaRepository.findByEvento(evento));
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
        eventoRepository.delete(evento);
    }

    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    public List<DisponibilidadSectorDTO> obtenerDisponibilidad(Integer eventoId) {
        Evento evento = obtenerEvento(eventoId);
        List<Sector> sectores = sectorRepository.findByEstadio(evento.getEstadio());

        List<DisponibilidadSectorDTO> resultado = new ArrayList<>();
        for (Sector sector : sectores) {
            long disponibles = entradaRepository.countByEventoAndSectorAndEstado(evento, sector, "DISPONIBLE");
            resultado.add(new DisponibilidadSectorDTO(
                    sector.getCodigo(), (int) disponibles, sector.getPrecio(), sector.getCapMax()));
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

    private void validarEquiposYFecha(Equipo equipoLocal, Equipo equipoVisitante, LocalDate fechaEvento) {
        if (equipoLocal.getId().equals(equipoVisitante.getId())) {
            throw new InvalidOperationException("Los equipos local y visitante no pueden ser iguales");
        }
        if (fechaEvento.isBefore(LocalDate.now())) {
            throw new InvalidOperationException("La fecha del evento no puede ser en el pasado");
        }
    }

    private void generarEntradas(Evento evento) {
        List<Sector> sectores = sectorRepository.findByEstadio(evento.getEstadio());
        List<Entrada> nuevasEntradas = new ArrayList<>();

        for (Sector sector : sectores) {
            for (int numero = 1; numero <= sector.getCapMax(); numero++) {
                Entrada entrada = new Entrada();
                entrada.setEvento(evento);
                entrada.setSector(sector);
                entrada.setNumeroAsiento(numero);
                entrada.setCosto(sector.getPrecio());
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
