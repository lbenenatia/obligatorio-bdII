import { api } from '@/services/api';
import { Compra } from '@/types/compra';

export const CompraService = {
    crear: async (eventoId: number, codigoSector: string, cantEntradas: number) =>
        api.post<Compra>(
            `/compras?eventoId=${eventoId}&codigoSector=${codigoSector}&cantEntradas=${cantEntradas}`
        ),
    obtener: async (id: number) => api.get<Compra>(`/compras/${id}`),
    misCompras: async () => api.get<Compra[]>('/compras/mias'),
    confirmar: async (id: number) => api.post<string>(`/compras/${id}/confirmar`),
    pagar: async (id: number) => api.post<string>(`/compras/${id}/pagar`),
    listarTodas: async () => api.get<Compra[]>('/compras'),
};
