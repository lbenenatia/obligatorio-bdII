import { Entrada } from '@/types/entrada';

let compras: Entrada[] = [];

export function agregarCompra(entrada: Entrada) {
    compras.push(entrada);
}

export function getCompras() {
    return compras;
}