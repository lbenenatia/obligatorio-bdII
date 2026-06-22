import { api } from '@/services/api';
import { Evento } from '@/types/evento';
import { DispositivoAsignado, SectorAsignado } from '@/types/funcionario';

export const FuncionarioService = {
    miSector: async () => api.get<SectorAsignado[]>('/funcionarios/mi-sector'),
    miEvento: async () => api.get<Evento | undefined>('/funcionarios/mi-evento'),
    miDispositivo: async () => api.get<DispositivoAsignado | undefined>('/funcionarios/mi-dispositivo'),
};
