import { api } from '@/services/api';
import { UsuarioGeneralResumen, UsuarioResumen } from '@/types/usuario';

export const UsuarioService = {
    buscarPorEmail: async (email: string) =>
        api.get<UsuarioResumen[]>(`/usuarios/buscar?email=${encodeURIComponent(email)}`),
    contar: async () => api.get<number>('/usuarios/count'),
    listarGenerales: async () => api.get<UsuarioGeneralResumen[]>('/usuarios/generales'),
    actualizarVerificacion: async (id: number, verificado: boolean) =>
        api.put<void>(`/usuarios/${id}/verificacion?verificado=${verificado}`),
};
