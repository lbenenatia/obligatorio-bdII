import { entradasMock } from '@/data/entradas';

export const EntradaService = {
    obtenerPorUsuario: async (usuarioId: number) => {
        return entradasMock.filter(
            (e) => e.usuarioId === usuarioId
        );
    },

    obtenerPorId: async (id: number) => {
        return entradasMock.find(
            (e) => e.id === id
        );
    },
};