package com.mundial2026.entity;

import java.io.Serializable;
import java.util.Objects;

public class FuncionarioSectorId implements Serializable {

    private Integer funcionario;
    private Integer sector;

    public FuncionarioSectorId() {
    }

    public FuncionarioSectorId(Integer funcionario, Integer sector) {
        this.funcionario = funcionario;
        this.sector = sector;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FuncionarioSectorId)) return false;
        FuncionarioSectorId that = (FuncionarioSectorId) o;
        return Objects.equals(funcionario, that.funcionario) && Objects.equals(sector, that.sector);
    }

    @Override
    public int hashCode() {
        return Objects.hash(funcionario, sector);
    }
}
