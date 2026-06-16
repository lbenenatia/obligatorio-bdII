import { Evento } from '@/types/evento';
import { createContext, useContext, useState } from 'react';

type EventoContextType = {
    eventos: Evento[];
    agregarEvento: (evento: Evento) => void;
    editarEvento: (eventoActualizado: Evento) => void;
    eliminarEvento: (id: number) => void;
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
    return (
            <EventoContext.Provider
                value={{
                    eventos,
                    agregarEvento,
                    editarEvento,
                    eliminarEvento,
                }}
            >
                {children}
            </EventoContext.Provider>
        );
}

export const useEventos = () => useContext(EventoContext);