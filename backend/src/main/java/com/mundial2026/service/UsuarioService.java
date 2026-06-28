package com.mundial2026.service;

import com.mundial2026.entity.Direccion;
import com.mundial2026.entity.usuario.Usuario;
import com.mundial2026.entity.usuario.General;
import com.mundial2026.entity.usuario.Administrador;
import com.mundial2026.entity.usuario.Funcionario;
import com.mundial2026.entity.usuario.Telefono;
import com.mundial2026.repository.UsuarioRepository;
import com.mundial2026.repository.DireccionRepository;
import com.mundial2026.repository.GeneralRepository;
import com.mundial2026.exception.ResourceNotFoundException;
import com.mundial2026.exception.EmailAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DireccionRepository direccionRepository;

    @Autowired
    private GeneralRepository generalRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Direccion obtenerOCrearDireccion(Direccion direccion) {
        return direccionRepository
                .findByCalleAndNroDireccionAndLocalidadAndPaisDireccionAndCodigoPostal(
                        direccion.getCalle(), direccion.getNroDireccion(), direccion.getLocalidad(),
                        direccion.getPaisDireccion(), direccion.getCodigoPostal())
                .orElseGet(() -> direccionRepository.save(direccion));
    }

    public Usuario obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + email));
    }

    public Usuario obtenerPorId(Integer id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));
    }

    public General crearEspectador(General general, List<String> numerosTelefono) {
        if (usuarioRepository.existsByEmail(general.getEmail())) {
            throw new EmailAlreadyExistsException("El email ya está registrado");
        }
        if (general.getDireccion() != null) {
            general.setDireccion(obtenerOCrearDireccion(general.getDireccion()));
        }
        general.setContrasena(passwordEncoder.encode(general.getContrasena()));
        asignarTelefonos(general, numerosTelefono);
        return usuarioRepository.save(general);
    }

    public Administrador crearAdministrador(Administrador admin, List<String> numerosTelefono) {
        if (usuarioRepository.existsByEmail(admin.getEmail())) {
            throw new EmailAlreadyExistsException("El email ya está registrado");
        }
        if (admin.getDireccion() != null) {
            admin.setDireccion(obtenerOCrearDireccion(admin.getDireccion()));
        }
        admin.setContrasena(passwordEncoder.encode(admin.getContrasena()));
        asignarTelefonos(admin, numerosTelefono);
        return usuarioRepository.save(admin);
    }

    public Funcionario crearFuncionario(Funcionario funcionario, List<String> numerosTelefono) {
        if (usuarioRepository.existsByEmail(funcionario.getEmail())) {
            throw new EmailAlreadyExistsException("El email ya está registrado");
        }
        if (funcionario.getDireccion() != null) {
            funcionario.setDireccion(obtenerOCrearDireccion(funcionario.getDireccion()));
        }
        funcionario.setContrasena(passwordEncoder.encode(funcionario.getContrasena()));
        asignarTelefonos(funcionario, numerosTelefono);
        return usuarioRepository.save(funcionario);
    }

    public List<General> listarGenerales() {
        return generalRepository.findAll();
    }

    public General actualizarVerificacion(Integer id, Boolean verificado) {
        General general = generalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        general.setVerificacion(verificado);
        return generalRepository.save(general);
    }

    public boolean validarCredenciales(String email, String contrasena) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        return usuario.isPresent() && passwordEncoder.matches(contrasena, usuario.get().getContrasena());
    }

    public Usuario actualizarUsuario(Integer id, Usuario usuarioActualizado, List<String> numerosTelefono) {
        Usuario usuario = obtenerPorId(id);
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setApellido(usuarioActualizado.getApellido());
        asignarTelefonos(usuario, numerosTelefono);
        if (usuarioActualizado.getDireccion() != null) {
            usuario.setDireccion(obtenerOCrearDireccion(usuarioActualizado.getDireccion()));
        }
        return usuarioRepository.save(usuario);
    }

    private void asignarTelefonos(Usuario usuario, List<String> numerosTelefono) {
        usuario.getTelefonos().clear();
        if (numerosTelefono == null) {
            return;
        }
        for (String numero : numerosTelefono) {
            Telefono telefono = new Telefono();
            telefono.setUsuario(usuario);
            telefono.setNumero(numero);
            usuario.getTelefonos().add(telefono);
        }
    }
}
