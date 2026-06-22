package com.mundial2026.entity.usuario;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "general")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("GENERAL")
public class General extends Usuario {
    // Esta clase representa a los espectadores/usuarios generales
}
