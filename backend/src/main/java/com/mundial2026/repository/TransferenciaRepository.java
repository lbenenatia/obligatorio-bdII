package com.mundial2026.repository;

import com.mundial2026.entity.Transferencia;
import com.mundial2026.entity.usuario.General;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransferenciaRepository extends JpaRepository<Transferencia, Integer> {
    List<Transferencia> findByRemitente(General remitente);
    List<Transferencia> findByDestinatario(General destinatario);
    List<Transferencia> findByRemitenteAndAprobacion(General remitente, Boolean aprobacion);
    List<Transferencia> findByAprobacionAndRemitenteOrDestinatario(Boolean aprobacion, General remitente, General destinatario);
}
