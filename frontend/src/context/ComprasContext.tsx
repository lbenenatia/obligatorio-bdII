import { Compra } from '@/types/compra';
import { Transferencia } from '@/types/transferencia';
import { createContext, useContext, useState } from 'react';

type ComprasContextType = {
    compras: Compra[];
    agregarCompra: (c: Compra) => void;
    actualizarCompra: (id: string, usuarioId: number) => void;
};

const ComprasContext = createContext<ComprasContextType>(null as any);

export function ComprasProvider({ children }: any) {
    const [compras, setCompras] = useState<Compra[]>([]);
    const [transferencias, setTransferencias] = useState<Transferencia[]>([]);

    const agregarCompra = (c: Compra) => {
        setCompras(prev => [...prev, c]);
    };
    const actualizarCompra = (id: string, usuarioId: number) => {
        setCompras(prev =>
            prev.map(c =>
                c.id === id
                    ? { ...c, usuarioId, transferido: true }
                    : c
            )
        );
    };
    return (
        <ComprasContext.Provider value={{
            compras,
            agregarCompra,
            actualizarCompra
        }}>
            {children}
        </ComprasContext.Provider>
    );
}

export const useCompras = () => useContext(ComprasContext);