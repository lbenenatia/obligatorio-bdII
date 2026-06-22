package com.mundial2026.repository;

import com.mundial2026.entity.Compra;
import com.mundial2026.entity.usuario.General;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Integer> {
    List<Compra> findByUsuario(General usuario);
    List<Compra> findByUsuarioAndEstado(General usuario, String estado);
    List<Compra> findByFechaCompraBetween(LocalDateTime inicio, LocalDateTime fin);
}
