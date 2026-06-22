package com.mundial2026.repository;

import com.mundial2026.entity.Estadio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface EstadioRepository extends JpaRepository<Estadio, Integer> {
    Optional<Estadio> findByNombreEstadio(String nombre);
    List<Estadio> findByUbicacion(String ubicacion);
}
