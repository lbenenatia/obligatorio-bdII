// Devuelve la fecha de HOY en formato YYYY-MM-DD según el huso horario LOCAL del dispositivo.
// new Date().toISOString() devuelve la fecha en UTC, lo cual rompe la comparación
// en husos horarios negativos (ej. Uruguay UTC-3): en las últimas horas del día local
// ya sería "mañana" en UTC, y los eventos de "hoy" dejarían de matchear.
export function hoyLocalISO(): string {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
}
