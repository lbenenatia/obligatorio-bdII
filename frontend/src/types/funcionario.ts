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
    nroVinculacion: string;
    autorizado: boolean;
}

export interface FuncionarioResumen {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    legajo: string;
    nroVinculacion: string | null;
    dispositivoAutorizado: boolean;
}
