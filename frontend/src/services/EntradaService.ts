import { api } from '@/services/api';
import { Entrada } from '@/types/entrada';

export const EntradaService = {
    misEntradas: async () => api.get<Entrada[]>('/entradas/mias'),
    obtener: async (id: number) => api.get<Entrada>(`/entradas/${id}`),
    misValidadas: async () => api.get<Entrada[]>('/entradas/validadas/mias'),
};
