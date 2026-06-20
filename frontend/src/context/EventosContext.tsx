import { Evento } from '@/types/evento';
import { createContext, useContext, useState } from 'react';

type EventoContextType = {
    eventos: Evento[];
    agregarEvento: (evento: Evento) => void;
    editarEvento: (eventoActualizado: Evento) => void;
    eliminarEvento: (id: number) => void;
    obtenerProximoEvento: () => Evento | null;
};

const EventoContext = createContext<EventoContextType>(
    {} as EventoContextType
);

export function EventoProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [eventos, setEventos] = useState<Evento[]>([]);

    const agregarEvento = (evento: Evento) => {
        setEventos((prev) => [...prev, evento]);
    };
    const editarEvento = (eventoActualizado: Evento) => {
        setEventos((prev) =>
            prev.map((evento) =>
                evento.id === eventoActualizado.id
                    ? eventoActualizado
                    : evento
            )
        );
    };
    const eliminarEvento = (id: number) => {
        setEventos((prev) =>
            prev.filter((evento) => evento.id !== id)
        );
    };
    const obtenerProximoEvento = () => {
        const ahora = new Date();

        const futuros = eventos
            .map(e => {
                const [dia, mes, anio] = e.fecha.split('/');

                return {
                    ...e,
                    fechaDate: new Date(`${anio}-${mes}-${dia}T${e.hora}`),
                };
            })
            .filter(e => e.fechaDate > ahora)
            .sort((a, b) => a.fechaDate.getTime() - b.fechaDate.getTime());

        return futuros[0] || null;
    };
    return (
        <EventoContext.Provider
            value={{
                eventos,
                agregarEvento,
                editarEvento,
                eliminarEvento,
                obtenerProximoEvento,
            }}
        >
            {children}
        </EventoContext.Provider>
    );
}

export const useEventos = () => useContext(EventoContext);