import { api } from '@/services/api';

export interface RegistroGeneralRequest {
    email: string;
    contrasena: string;
    nombre: string;
    apellido: string;
    paisDocumento: string;
    nroDocumento: string;
    documentoTipo: string;
    localidad: string;
    calle: string;
    paisDireccion: string;
    nroDireccion: number;
    codigoPostal: string;
    telefonos: string[];
}

export const AuthService = {
    registrarEspectador: async (datos: RegistroGeneralRequest) => {
        return api.post<string>('/auth/registro/espectador', datos);
    },
};
