package com.mundial2026.repository;

import com.mundial2026.entity.FuncionarioSector;
import com.mundial2026.entity.Sector;
import com.mundial2026.entity.usuario.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FuncionarioSectorRepository extends JpaRepository<FuncionarioSector, Integer> {
    List<FuncionarioSector> findByFuncionario(Funcionario funcionario);
    Optional<FuncionarioSector> findByFuncionarioAndSector(Funcionario funcionario, Sector sector);
}
