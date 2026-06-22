package com.mundial2026.repository;

import com.mundial2026.entity.Evento;
import com.mundial2026.entity.EventoSector;
import com.mundial2026.entity.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventoSectorRepository extends JpaRepository<EventoSector, Integer> {
    List<EventoSector> findByEvento(Evento evento);
    Optional<EventoSector> findByEventoAndSector(Evento evento, Sector sector);
}
