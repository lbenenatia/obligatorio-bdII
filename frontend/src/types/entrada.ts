export interface Entrada {
    id: number;
    eventoId: number;
    equipoLocal: string;
    equipoVisitante: string;
    fechaEvento: string; // YYYY-MM-DD
    horaEvento: string; // HH:mm:ss
    estadioNombre: string;
    sectorCodigo: 'A' | 'B' | 'C' | 'D';
    precio: number;
    numeroAsiento: number;
    estado: 'DISPONIBLE' | 'VENDIDA' | 'TRANSFERIDA' | 'CONSUMIDA';
    codigoQR: string | null;
    consumida: boolean;
    fechaConsumo: string | null;
}
