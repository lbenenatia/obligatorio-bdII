package com.mundial2026.repository;

import com.mundial2026.entity.Dispositivo;
import com.mundial2026.entity.usuario.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface DispositivoRepository extends JpaRepository<Dispositivo, Integer> {
    Optional<Dispositivo> findByDispositivoId(String dispositivoId);
    List<Dispositivo> findByAutorizado(Boolean autorizado);
    List<Dispositivo> findByFuncionario(Funcionario funcionario);
}
