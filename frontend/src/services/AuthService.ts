import { setUsuarioLogueado } from '@/data/sesion';
import { usuariosMock } from '@/data/usuarios';
import { Usuario } from '@/types/usuario';

export const AuthService = {
    login: async (
        email: string,
        password: string
    ) => {
        const usuario = usuariosMock.find(
            u =>
                u.email === email &&
                u.password === password
        );

        if (!usuario) {
            throw new Error(
                'Credenciales incorrectas'
            );
        }
        if (!usuario) {
            throw new Error(
                'Credenciales incorrectas'
            );
        }

        setUsuarioLogueado(usuario);

        return usuario;
    },
    register: async (usuario: Usuario) => {
        const existeUsuario = usuariosMock.some(
            u =>
                u.email.toLowerCase() ===
                usuario.email.toLowerCase()
        );

        if (existeUsuario) {
            throw new Error(
                'Ya existe una cuenta con ese correo'
            );
        }

        usuariosMock.push(usuario);

        return usuario;
    },
};