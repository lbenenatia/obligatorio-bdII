import { createContext, useContext, useState } from 'react';
import { Estadio } from '../types/estadio';

type ContextType = {
    estadios: Estadio[];
    agregarEstadio: (e: Estadio) => void;
    editarEstadio: (e: Estadio) => void;
    eliminarEstadio: (id: number) => void;
};

const EstadiosContext = createContext<ContextType>(null as any);

export function EstadiosProvider({ children }: any) {
    const [estadios, setEstadios] = useState<Estadio[]>([]);

    const agregarEstadio = (e: Estadio) => {
        setEstadios(prev => [...prev, e]);
    };
    const editarEstadio = (estadioActualizado: Estadio) => {
        setEstadios(prev =>
            prev.map(e =>
                e.id === estadioActualizado.id
                    ? estadioActualizado
                    : e
            )
        );
    };
    const eliminarEstadio = (id: number) => {
        setEstadios(prev =>
            prev.filter(e => e.id !== id)
        );
    };
    return (
        <EstadiosContext.Provider value={{ estadios, agregarEstadio, editarEstadio, eliminarEstadio }}>
            {children}
        </EstadiosContext.Provider>
    );
}

export const useEstadios = () => useContext(EstadiosContext);