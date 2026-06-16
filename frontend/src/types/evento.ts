export interface Evento {
    id: number;
    paisLocal: string;
    paisVisitante: string;
    fecha: string;
    hora: string;
    estadio: string;
    capacidad: number;

    sectores: Partial<{
        A: {
            capacidad: number;
            precio: number;
        };
        B: {
            capacidad: number;
            precio: number;
        };
        C: {
            capacidad: number;
            precio: number;
        };
        D: {
            capacidad: number;
            precio: number;
        };
    }>;
}