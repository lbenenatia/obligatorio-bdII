import { api } from '@/services/api';
import { Evento } from '@/types/evento';
import { DispositivoAsignado, FuncionarioResumen, SectorAsignado } from '@/types/funcionario';

export const FuncionarioService = {
    miSector: async () => api.get<SectorAsignado[]>('/funcionarios/mi-sector'),
    miEvento: async () => api.get<Evento | undefined>('/funcionarios/mi-evento'),
    miDispositivo: async () => api.get<DispositivoAsignado | undefined>('/funcionarios/mi-dispositivo'),
    listar: async () => api.get<FuncionarioResumen[]>('/funcionarios'),
    autorizarDispositivo: async (funcionarioId: number, nroVinculacion: string) =>
        api.post<DispositivoAsignado>(
            `/funcionarios/${funcionarioId}/dispositivo?nroVinculacion=${encodeURIComponent(nroVinculacion)}`
        ),
    revocarDispositivo: async (funcionarioId: number) =>
        api.del<void>(`/funcionarios/${funcionarioId}/dispositivo`),
    sectoresDe: async (funcionarioId: number) =>
        api.get<SectorAsignado[]>(`/funcionarios/${funcionarioId}/sectores`),
    asignarSector: async (funcionarioId: number, sectorId: number) =>
        api.post<void>(`/funcionarios/${funcionarioId}/sectores/${sectorId}`),
    quitarSector: async (funcionarioId: number, sectorId: number) =>
        api.del<void>(`/funcionarios/${funcionarioId}/sectores/${sectorId}`),
};
