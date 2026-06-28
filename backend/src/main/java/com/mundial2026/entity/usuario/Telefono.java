package com.mundial2026.entity.usuario;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "telefono")
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(TelefonoId.class)
public class Telefono {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnore
    private Usuario usuario;

    @Id
    @Column(name = "numero", length = 30, nullable = false)
    private String numero;
}
