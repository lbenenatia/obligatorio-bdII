export interface Sector {
    id?: number;
    codigo: 'A' | 'B' | 'C' | 'D';
    capMax: number;
    precio: number;
}

export interface Estadio {
    id: number;
    nombreEstadio: string;
    ubicacion: string;
    sectores: Sector[];
}
