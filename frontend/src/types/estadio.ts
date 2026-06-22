export interface Sector {
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
