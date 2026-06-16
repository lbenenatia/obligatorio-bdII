export interface Estadio {
    id: number;
    nombre: string;
    pais: string;
    ciudad: string;
    capacidad: number;

    sectores: {
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
    };
}