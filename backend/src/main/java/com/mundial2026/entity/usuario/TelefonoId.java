package com.mundial2026.entity.usuario;

import java.io.Serializable;
import java.util.Objects;

public class TelefonoId implements Serializable {

    private Integer usuario;
    private String numero;

    public TelefonoId() {
    }

    public TelefonoId(Integer usuario, String numero) {
        this.usuario = usuario;
        this.numero = numero;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TelefonoId)) return false;
        TelefonoId that = (TelefonoId) o;
        return Objects.equals(usuario, that.usuario) && Objects.equals(numero, that.numero);
    }

    @Override
    public int hashCode() {
        return Objects.hash(usuario, numero);
    }
}
