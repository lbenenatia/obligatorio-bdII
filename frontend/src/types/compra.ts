export type Compra = {
    id: string;
    usuarioId: number;
    match: string;
    date: string;
    time: string;
    estadio: string;
    sector: 'A' | 'B';
    cantidad: number;
    precioUnitario: number;
    total: number;
};