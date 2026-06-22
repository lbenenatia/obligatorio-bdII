import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'mundi26_token';

// Base URL del backend. Configurable con EXPO_PUBLIC_API_URL (ej. en un .env):
// - Web / iOS simulator en la misma máquina que el backend: http://localhost:8080/api (default)
// - Android emulator: http://10.0.2.2:8080/api
// - Dispositivo físico: http://<IP-LAN-de-la-máquina-con-el-backend>:8080/api
const BASE_URL =
    process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080/api';

// expo-secure-store no tiene implementación en web (su build .web.ts es un stub vacío).
// En web usamos localStorage nativo del navegador en su lugar.
export async function guardarToken(token: string) {
    if (Platform.OS === 'web') {
        localStorage.setItem(TOKEN_KEY, token);
        return;
    }
    await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function obtenerToken() {
    if (Platform.OS === 'web') {
        return localStorage.getItem(TOKEN_KEY);
    }
    return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function borrarToken() {
    if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY);
        return;
    }
    await SecureStore.deleteItemAsync(TOKEN_KEY);
}

// El JWT vence a las 24hs (ver app.jwt.expiration en el back). Si vence con la app abierta,
// cualquier request autenticado empieza a devolver 401/403. AuthContext registra acá un
// callback para enterarse y cerrar la sesión/redirigir al login en vez de dejar errores sueltos.
let onSesionExpirada: (() => void) | null = null;

export function setOnSesionExpirada(callback: (() => void) | null) {
    onSesionExpirada = callback;
}

async function apiFetch<T>(
    path: string,
    options: { method?: string; body?: unknown } = {}
): Promise<T> {
    const token = await obtenerToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        method: options.method ?? 'GET',
        headers,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    const texto = await response.text();
    let data: unknown = undefined;
    if (texto) {
        try {
            data = JSON.parse(texto);
        } catch {
            // Algunos endpoints (ej. /confirmar, /pagar) devuelven texto plano, no JSON.
            data = texto;
        }
    }

    if (!response.ok) {
        if (token && (response.status === 401 || response.status === 403)) {
            await borrarToken();
            onSesionExpirada?.();
            throw new Error('Tu sesión expiró. Por favor, iniciá sesión nuevamente.');
        }

        const mensaje =
            data && typeof data === 'object' && 'error' in data
                ? (data as { error: string }).error
                : typeof data === 'string' && data
                    ? data
                    : `Error ${response.status}`;
        throw new Error(mensaje);
    }

    return data as T;
}

export const api = {
    get: <T>(path: string) => apiFetch<T>(path),
    post: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: 'POST', body }),
    put: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: 'PUT', body }),
    del: <T>(path: string) => apiFetch<T>(path, { method: 'DELETE' }),
};
