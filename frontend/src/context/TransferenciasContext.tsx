import { createContext, useContext, useState } from 'react';
import { Transferencia } from '../types/transferencia';
import { useCompras } from './ComprasContext';

type TransferenciasContextType = {
    transferencias: Transferencia[];
    agregarTransferencia: (t: Transferencia) => void;
    aceptarTransferencia: (id: string) => void;
    rechazarTransferencia: (id: string) => void;
};

const TransferenciasContext = createContext<TransferenciasContextType>(null as any);

export function TransferenciasProvider({ children }: any) {
    const [transferencias, setTransferencias] = useState<Transferencia[]>([]);

    const { actualizarCompra } = useCompras();

    const agregarTransferencia = (t: Transferencia) => {
        setTransferencias(prev => [...prev, t]);
    };

    const aceptarTransferencia = (id: string) => {
        const t = transferencias.find(x => x.id === id);
        if (!t) return;

        actualizarCompra(t.compraId, t.aUsuarioId);

        setTransferencias(prev =>
            prev.map(tr =>
                tr.id === id
                    ? { ...tr, estado: 'ACEPTADA' }
                    : tr
            )
        );
    };

    const rechazarTransferencia = (id: string) => {
        setTransferencias(prev =>
            prev.map(tr =>
                tr.id === id
                    ? { ...tr, estado: 'RECHAZADA' }
                    : tr
            )
        );
    };

    return (
        <TransferenciasContext.Provider
            value={{
                transferencias,
                agregarTransferencia,
                aceptarTransferencia,
                rechazarTransferencia
            }}
        >
            {children}
        </TransferenciasContext.Provider>
    );
}

export const useTransferencias = () => useContext(TransferenciasContext);