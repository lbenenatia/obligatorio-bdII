export interface Equipo {
    id: number;
    nombreEquipo: string;
}

export interface EstadioResumen {
    id: number;
    nombreEstadio: string;
    ubicacion: string;
}

export interface Evento {
    id: number;
    estadio: EstadioResumen;
    equipoLocal: Equipo;
    equipoVisitante: Equipo;
    fechaEvento: string; // YYYY-MM-DD
    horaEvento: string; // HH:mm:ss
    estado: 'PENDIENTE' | 'APROBADO' | 'CANCELADO';
}

export interface DisponibilidadSector {
    codigo: 'A' | 'B' | 'C' | 'D';
    disponibles: number;
    precio: number;
    capMax: number;
}
