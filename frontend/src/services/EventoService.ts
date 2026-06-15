import { eventosMock } from '@/data/eventos';

export const EventoService = {
    obtenerProximoEvento: async () => {
        return eventosMock[0];
    },
};