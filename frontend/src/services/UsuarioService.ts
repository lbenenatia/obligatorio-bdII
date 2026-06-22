import { api } from '@/services/api';
import { UsuarioResumen } from '@/types/usuario';

export const UsuarioService = {
    buscarPorEmail: async (email: string) =>
        api.get<UsuarioResumen[]>(`/usuarios/buscar?email=${encodeURIComponent(email)}`),
    contar: async () => api.get<number>('/usuarios/count'),
};
