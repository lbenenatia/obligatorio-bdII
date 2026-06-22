import { api } from '@/services/api';
import { Estadio, Sector } from '@/types/estadio';

export interface EstadioRequest {
    nombreEstadio: string;
    ubicacion: string;
    sectores: Sector[];
}

export const EstadioService = {
    listar: async () => api.get<Estadio[]>('/estadios'),
    obtener: async (id: number) => api.get<Estadio>(`/estadios/${id}`),
    crear: async (datos: EstadioRequest) => api.post<Estadio>('/estadios', datos),
    actualizar: async (id: number, datos: EstadioRequest) => api.put<Estadio>(`/estadios/${id}`, datos),
    eliminar: async (id: number) => api.del<void>(`/estadios/${id}`),
};
