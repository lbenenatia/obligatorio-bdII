import { api } from '@/services/api';
import { Sector } from '@/types/estadio';
import { DisponibilidadSector, Evento } from '@/types/evento';

export interface EventoRequest {
    estadioId: number;
    equipoLocalNombre: string;
    equipoVisitanteNombre: string;
    fechaEvento: string; // YYYY-MM-DD
    horaEvento: string; // HH:mm
    // Override opcional de capacidad/precio por sector para este evento (si no se manda, usa los del estadio)
    sectores?: Sector[];
}

export const EventoService = {
    listar: async () => api.get<Evento[]>('/eventos'),
    obtener: async (id: number) => api.get<Evento>(`/eventos/${id}`),
    crear: async (datos: EventoRequest) => api.post<Evento>('/eventos', datos),
    actualizar: async (id: number, datos: EventoRequest) => api.put<Evento>(`/eventos/${id}`, datos),
    eliminar: async (id: number) => api.del<void>(`/eventos/${id}`),
    aprobar: async (id: number) => api.post<string>(`/eventos/${id}/aprobar`),
    cancelar: async (id: number) => api.post<string>(`/eventos/${id}/cancelar`),
    disponibilidad: async (id: number) => api.get<DisponibilidadSector[]>(`/eventos/${id}/disponibilidad`),
};
