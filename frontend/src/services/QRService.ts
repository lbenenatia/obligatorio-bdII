import { api } from '@/services/api';
import { Entrada } from '@/types/entrada';

export interface ValidacionQR {
    resultado: 'VALIDA' | 'USADA' | 'INVALIDA' | 'DISPOSITIVO_NO_AUTORIZADO';
    entrada: Entrada | null;
}

export const QRService = {
    generar: async (entradaId: number) => api.post<Entrada>(`/qr/generar/${entradaId}`),
    // skipAuthLogout: esta llamada siempre responde 200 con un "resultado" (incluso para
    // QR usado/inválido/dispositivo no autorizado) - un 401/403 acá nunca es "se cerró la
    // sesión del funcionario", así que no debe deslogearlo.
    validar: async (codigoQR: string, nroVinculacion: string) =>
        api.post<ValidacionQR>(
            `/qr/${encodeURIComponent(codigoQR)}/validar?nroVinculacion=${encodeURIComponent(nroVinculacion)}`,
            undefined,
            { skipAuthLogout: true }
        ),
};
