package com.mundial2026.repository;

import com.mundial2026.entity.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EquipoRepository extends JpaRepository<Equipo, Integer> {
    Optional<Equipo> findByNombreEquipo(String nombre);
}
