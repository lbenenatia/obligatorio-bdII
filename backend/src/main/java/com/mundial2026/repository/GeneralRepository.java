package com.mundial2026.repository;

import com.mundial2026.entity.usuario.General;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GeneralRepository extends JpaRepository<General, Integer> {
    List<General> findByEmailContainingIgnoreCase(String email);
    Optional<General> findByEmail(String email);
}
