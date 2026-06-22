package com.mundial2026.repository;

import com.mundial2026.entity.Direccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DireccionRepository extends JpaRepository<Direccion, Integer> {
    Optional<Direccion> findByCalleAndNroDireccionAndLocalidadAndPaisDireccionAndCodigoPostal(
            String calle, Integer nroDireccion, String localidad, String paisDireccion, String codigoPostal);
}
