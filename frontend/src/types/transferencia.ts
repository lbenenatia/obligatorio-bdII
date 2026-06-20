export interface Transferencia {
    id: string;
    compraId: string;
    deUsuarioId: number;
    deUsuarioNombre: string;
    aUsuarioId: number;
    estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA';
}