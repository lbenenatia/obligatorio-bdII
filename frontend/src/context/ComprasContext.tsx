import { Compra } from '@/types/compra';
import { createContext, useContext, useState } from 'react';

type ComprasContextType = {
    compras: Compra[];
    agregarCompra: (c: Compra) => void;

    transferirCompra: (
        compraId: string,
        nuevoUsuarioId: number
    ) => void;
};

const ComprasContext = createContext<ComprasContextType>(null as any);

export function ComprasProvider({ children }: any) {
    const [compras, setCompras] = useState<Compra[]>([]);

    const agregarCompra = (c: Compra) => {
        setCompras(prev => [...prev, c]);
    };
    const transferirCompra = (
        compraId: string,
        nuevoUsuarioId: number
    ) => {
        setCompras(prev =>
            prev.map(c =>
                c.id === compraId
                    ? {
                        ...c,
                        usuarioId: nuevoUsuarioId,
                    }
                    : c
            )
        );
    };
    return (
        <ComprasContext.Provider value={{ compras, agregarCompra, transferirCompra }}>
            {children}
        </ComprasContext.Provider>
    );
}

export const useCompras = () => useContext(ComprasContext);