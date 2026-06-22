package com.mundial2026.repository;

import com.mundial2026.entity.Evento;
import com.mundial2026.entity.Estadio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
    List<Evento> findByEstadio(Estadio estadio);
    List<Evento> findByEstadioInAndFechaEventoGreaterThanEqualOrderByFechaEventoAscHoraEventoAsc(List<Estadio> estadios, LocalDate fecha);
    List<Evento> findByFechaEvento(LocalDate fecha);
    List<Evento> findByEstadoAndFechaEventoAfter(String estado, LocalDate fecha);
    Optional<Evento> findByEstadioAndFechaEventoAndHoraEvento(Estadio estadio, LocalDate fecha, java.time.LocalTime hora);
}
