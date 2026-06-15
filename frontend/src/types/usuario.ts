export type Rol =
    | 'ADMIN'
    | 'FUNCIONARIO'
    | 'USUARIO';

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    rol: Rol;

    paisDocumento: string;
    tipoDocumento: string;
    numeroDocumento: string;

    pais: string;
    localidad: string;
    calle: string;
    numeroPuerta: string;
    cp: string;

    telefonos: string[];
}