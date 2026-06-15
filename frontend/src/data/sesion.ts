import { Usuario } from '@/types/usuario';

let usuarioLogueado: Usuario | null = null;

export const setUsuarioLogueado = (
    usuario: Usuario
) => {
    usuarioLogueado = usuario;
};

export const getUsuarioLogueado = () => {
    return usuarioLogueado;
};

export const cerrarSesion = () => {
    usuarioLogueado = null;
};