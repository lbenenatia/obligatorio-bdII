import { api } from '@/services/api';
import { Transferencia } from '@/types/transferencia';

export const TransferenciaService = {
    crear: async (destinatarioEmail: string, entradaIds: number[]) =>
        api.post<Transferencia[]>('/transferencias', { destinatarioEmail, entradaIds }),
    listarTodas: async () => api.get<Transferencia[]>('/transferencias'),
    misTransferencias: async () => api.get<Transferencia[]>('/transferencias/mias'),
    aceptar: async (id: number) => api.post<Transferencia>(`/transferencias/${id}/aceptar`),
    rechazar: async (id: number) => api.post<Transferencia>(`/transferencias/${id}/rechazar`),
};
