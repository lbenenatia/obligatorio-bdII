package com.mundial2026.repository;

import com.mundial2026.entity.Sector;
import com.mundial2026.entity.Estadio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SectorRepository extends JpaRepository<Sector, Integer> {
    List<Sector> findByEstadio(Estadio estadio);
    Optional<Sector> findByEstadioAndCodigo(Estadio estadio, Character codigo);
}
