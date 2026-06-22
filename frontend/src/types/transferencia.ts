export interface Transferencia {
    id: number;
    remitenteEmail: string;
    destinatarioEmail: string;
    cantTransf: number;
    aprobacion: boolean;
    entradaIds: number[];
}
