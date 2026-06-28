export interface Transferencia {
    id: number;
    entradaId: number;
    equipoLocal: string;
    equipoVisitante: string;
    fechaEvento: string; // YYYY-MM-DD
    sectorCodigo: 'A' | 'B' | 'C' | 'D';
    remitenteEmail: string;
    destinatarioEmail: string;
    estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA';
    fechaTransferencia: string;
}
