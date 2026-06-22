package com.mundial2026.repository;

import com.mundial2026.entity.Entrada;
import com.mundial2026.entity.Evento;
import com.mundial2026.entity.Sector;
import com.mundial2026.entity.usuario.Funcionario;
import com.mundial2026.entity.usuario.General;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EntradaRepository extends JpaRepository<Entrada, Integer> {
    List<Entrada> findByEvento(Evento evento);
    List<Entrada> findByEventoAndEstado(Evento evento, String estado);
    long countByEventoAndEstado(Evento evento, String estado);
    long countByEventoAndEstadoNot(Evento evento, String estado);
    long countByEventoAndSectorAndEstado(Evento evento, Sector sector, String estado);
    Optional<Entrada> findByCodigoQR(String codigoQR);
    List<Entrada> findByPropietarioActual(General propietarioActual);
    List<Entrada> findByValidadoPor(Funcionario validadoPor);
}
