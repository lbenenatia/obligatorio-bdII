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

// Compara la fecha/hora de un evento (formato YYYY-MM-DD / HH:mm[:ss]) contra el momento actual,
// ambos interpretados en hora LOCAL (mismo motivo que hoyLocalISO: evitar el corrimiento de UTC).
export function yaPaso(fechaEvento: string, horaEvento: string): boolean {
    const [anio, mes, dia] = fechaEvento.split('-').map(Number);
    const [hora, minuto] = horaEvento.split(':').map(Number);
    const fechaHoraEvento = new Date(anio, mes - 1, dia, hora, minuto || 0);
    return fechaHoraEvento.getTime() < Date.now();
}
