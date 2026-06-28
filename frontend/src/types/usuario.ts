export type Rol = 'ADMINISTRADOR' | 'FUNCIONARIO' | 'GENERAL';

export interface Direccion {
    calle: string;
    nroDireccion: number;
    localidad: string;
    paisDireccion: string;
    codigoPostal: string;
}

export interface Usuario {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    rol: Rol;

    paisDocumento: string;
    nroDocumento: string;
    documentoTipo: string;

    telefonos: string[];
    direccion: Direccion | null;
}

export interface UsuarioResumen {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
}

export interface UsuarioGeneralResumen {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    nroDocumento: string;
    verificacion: boolean;
    fechaRegistro: string;
}
