import { api } from '@/services/api';
import { Entrada } from '@/types/entrada';

export interface ValidacionQR {
    resultado: 'VALIDA' | 'USADA' | 'INVALIDA';
    entrada: Entrada | null;
}

export const QRService = {
    generar: async (entradaId: number) => api.post<Entrada>(`/qr/generar/${entradaId}`),
    validar: async (codigoQR: string) =>
        api.post<ValidacionQR>(`/qr/${encodeURIComponent(codigoQR)}/validar`),
};
