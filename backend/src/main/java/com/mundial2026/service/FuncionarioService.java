package com.mundial2026.service;

import com.mundial2026.entity.Dispositivo;
import com.mundial2026.entity.Estadio;
import com.mundial2026.entity.Evento;
import com.mundial2026.entity.FuncionarioSector;
import com.mundial2026.entity.Sector;
import com.mundial2026.entity.usuario.Funcionario;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.repository.DispositivoRepository;
import com.mundial2026.repository.EventoRepository;
import com.mundial2026.repository.FuncionarioRepository;
import com.mundial2026.repository.FuncionarioSectorRepository;
import com.mundial2026.repository.SectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private SectorRepository sectorRepository;

    @Autowired
    private FuncionarioSectorRepository funcionarioSectorRepository;

    @Autowired
    private DispositivoRepository dispositivoRepository;

    @Autowired
    private EventoRepository eventoRepository;

    public List<Sector> obtenerSectoresAsignados(String email) {
        return obtenerSectoresAsignados(obtenerFuncionarioPorEmail(email));
    }

    public Evento obtenerEventoActual(String email) {
        return obtenerEventoActual(obtenerFuncionarioPorEmail(email));
    }

    public Dispositivo obtenerDispositivo(String email) {
        return obtenerDispositivo(obtenerFuncionarioPorEmail(email));
    }

    private List<Sector> obtenerSectoresAsignados(Funcionario funcionario) {
        return funcionarioSectorRepository.findByFuncionario(funcionario).stream()
                .map(FuncionarioSector::getSector)
                .collect(Collectors.toList());
    }

    // No hay un vinculo directo funcionario-evento: el funcionario esta asignado a sector(es)
    // (y por lo tanto a estadio(s)). "Mi evento" es el proximo evento (hoy o futuro) en alguno
    // de esos estadios.
    private Evento obtenerEventoActual(Funcionario funcionario) {
        List<Estadio> estadios = obtenerSectoresAsignados(funcionario).stream()
                .map(Sector::getEstadio)
                .distinct()
                .collect(Collectors.toList());

        if (estadios.isEmpty()) {
            return null;
        }

        List<Evento> proximos = eventoRepository
                .findByEstadioInAndFechaEventoGreaterThanEqualOrderByFechaEventoAscHoraEventoAsc(
                        estadios, LocalDate.now());

        return proximos.isEmpty() ? null : proximos.get(0);
    }

    private Dispositivo obtenerDispositivo(Funcionario funcionario) {
        return dispositivoRepository.findByFuncionario(funcionario).stream()
                .findFirst()
                .orElse(null);
    }

    public FuncionarioSector asignarSector(Integer funcionarioId, Integer sectorId) {
        Funcionario funcionario = obtenerFuncionario(funcionarioId);
        Sector sector = sectorRepository.findById(sectorId)
                .orElseThrow(() -> new ResourceNotFoundException("Sector no encontrado"));

        Optional<FuncionarioSector> existente = funcionarioSectorRepository
                .findByFuncionarioAndSector(funcionario, sector);
        if (existente.isPresent()) {
            return existente.get();
        }

        FuncionarioSector asignacion = new FuncionarioSector();
        asignacion.setFuncionario(funcionario);
        asignacion.setSector(sector);
        return funcionarioSectorRepository.save(asignacion);
    }

    public void quitarSector(Integer funcionarioId, Integer sectorId) {
        Funcionario funcionario = obtenerFuncionario(funcionarioId);
        Sector sector = sectorRepository.findById(sectorId)
                .orElseThrow(() -> new ResourceNotFoundException("Sector no encontrado"));

        funcionarioSectorRepository.findByFuncionarioAndSector(funcionario, sector)
                .ifPresent(funcionarioSectorRepository::delete);
    }

    public Dispositivo autorizarDispositivo(Integer funcionarioId, String dispositivoId) {
        Funcionario funcionario = obtenerFuncionario(funcionarioId);

        Dispositivo dispositivo = dispositivoRepository.findByDispositivoId(dispositivoId)
                .orElseGet(Dispositivo::new);
        dispositivo.setDispositivoId(dispositivoId);
        dispositivo.setFuncionario(funcionario);
        dispositivo.setAutorizado(true);
        return dispositivoRepository.save(dispositivo);
    }

    public void revocarDispositivo(Integer funcionarioId) {
        Funcionario funcionario = obtenerFuncionario(funcionarioId);
        dispositivoRepository.findByFuncionario(funcionario)
                .forEach(d -> {
                    d.setAutorizado(false);
                    d.setFuncionario(null);
                    dispositivoRepository.save(d);
                });
    }

    private Funcionario obtenerFuncionario(Integer id) {
        return funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funcionario no encontrado"));
    }

    private Funcionario obtenerFuncionarioPorEmail(String email) {
        return funcionarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Funcionario no encontrado"));
    }
}
