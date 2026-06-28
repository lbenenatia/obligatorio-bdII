export interface Compra {
    id: number;
    fechaCompra: string;
    cantEntradas: number;
    montoTotal: number;
    comision: number;
    estado: 'PENDIENTE' | 'CONFIRMADA' | 'PAGA';
    // El back devuelve la entidad Entrada completa; del front solo usamos el id
    // para luego pedir el detalle/QR de cada una por separado.
    entradas: { id: number }[];
}
