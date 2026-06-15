export interface Entrada {
    id: number;
    usuarioId: number;

    equipoLocal: string;
    equipoVisitante: string;

    fecha: string;
    estadio: string;

    sector: string;
    asiento: string;

    estado: 'ACTIVA' | 'USADA';

}