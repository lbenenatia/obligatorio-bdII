package com.mundial2026.repository;

import com.mundial2026.entity.usuario.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {
    Optional<Funcionario> findByLegajo(String legajo);
    Optional<Funcionario> findByEmail(String email);
}
