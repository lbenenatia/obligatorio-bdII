import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const DEVICE_ID_KEY = 'mundi26_device_id';

function generarId(): string {
    const seccion = () => Math.random().toString(16).slice(2, 10);
    return `${seccion()}-${seccion()}-${seccion()}`;
}

// Número de vinculación de este dispositivo/navegador, generado una sola vez y persistido
// (igual que el token de sesión en services/api.ts). Lo usa el funcionario para identificar
// su dispositivo ante el admin y para que el backend valide que el escaneo de QR viene
// de un dispositivo autorizado.
export async function obtenerNroVinculacion(): Promise<string> {
    let id: string | null;

    if (Platform.OS === 'web') {
        id = localStorage.getItem(DEVICE_ID_KEY);
    } else {
        id = await SecureStore.getItemAsync(DEVICE_ID_KEY);
    }

    if (id) return id;

    id = generarId();
    if (Platform.OS === 'web') {
        localStorage.setItem(DEVICE_ID_KEY, id);
    } else {
        await SecureStore.setItemAsync(DEVICE_ID_KEY, id);
    }
    return id;
}
