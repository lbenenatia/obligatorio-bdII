import { Alert, Platform } from 'react-native';

// Alert.alert() de react-native-web es un no-op (no muestra nada). Estas
// funciones eligen window.alert/window.confirm en web y Alert nativo en mobile.

export function mostrarAlerta(titulo: string, mensaje: string, onClose?: () => void) {
    if (Platform.OS === 'web') {
        window.alert(`${titulo}\n\n${mensaje}`);
        onClose?.();
        return;
    }
    Alert.alert(titulo, mensaje, onClose ? [{ text: 'Aceptar', onPress: onClose }] : undefined);
}

export function confirmar(titulo: string, mensaje: string, textoConfirmar = 'Eliminar'): Promise<boolean> {
    if (Platform.OS === 'web') {
        return Promise.resolve(window.confirm(`${titulo}\n\n${mensaje}`));
    }
    return new Promise(resolve => {
        Alert.alert(titulo, mensaje, [
            { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
            { text: textoConfirmar, style: 'destructive', onPress: () => resolve(true) },
        ]);
    });
}
