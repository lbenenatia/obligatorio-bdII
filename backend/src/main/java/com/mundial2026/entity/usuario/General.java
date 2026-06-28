package com.mundial2026.entity.usuario;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "general")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("GENERAL")
public class General extends Usuario {

    private Boolean verificacion = false;

    private LocalDateTime fechaRegistro = LocalDateTime.now();
}
