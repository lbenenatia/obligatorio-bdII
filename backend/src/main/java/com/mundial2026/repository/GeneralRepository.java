package com.mundial2026.repository;

import com.mundial2026.entity.usuario.General;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GeneralRepository extends JpaRepository<General, Integer> {
    List<General> findByEmailContainingIgnoreCase(String email);
}
