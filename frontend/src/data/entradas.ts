import { Entrada } from '@/types/entrada';

export const entradasMock: Entrada[] = [
    {
        id: 1,
        usuarioId: 3,
        equipoLocal: 'Uruguay',
        equipoVisitante: 'Brasil',
        fecha: '28/06/2026 • 16:00',
        estadio: 'Estadio Centenario',
        sector: 'A',
        asiento: '15',
        estado: 'ACTIVA',
    },
    {
        id: 2,
        usuarioId: 3,
        equipoLocal: 'España',
        equipoVisitante: 'Argentina',
        fecha: '21/06/2026 • 18:00',
        estadio: 'Estadio BBVA',
        sector: 'B',
        asiento: '10',
        estado: 'ACTIVA',
    },
    {
        id: 3,
        usuarioId: 3,
        equipoLocal: 'Francia',
        equipoVisitante: 'Alemania',
        fecha: '01/05/2026 • 17:00',
        estadio: 'Stade de France',
        sector: 'C',
        asiento: '22',
        estado: 'USADA',
    },
];