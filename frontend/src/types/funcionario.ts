import { EstadioResumen } from '@/types/evento';

export interface SectorAsignado {
    id: number;
    codigo: 'A' | 'B' | 'C' | 'D';
    capMax: number;
    precio: number;
    estadio: EstadioResumen;
}

export interface DispositivoAsignado {
    id: number;
    dispositivoId: string;
    autorizado: boolean;
}
