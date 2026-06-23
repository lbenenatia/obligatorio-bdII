import { QRService } from '@/services/QRService';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useIsFocused, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../screen';

export default function EscanearEntrada() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const router = useRouter();
    // La camara solo debe estar prendida mientras esta pantalla esta activamente en foco:
    // si el funcionario cambia de tab, se apaga (se desmonta), y se reprende solo al volver.
    const enFoco = useIsFocused();

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        requestPermission();
        return (
            <View style={styles.container}>
                <Text style={styles.textoPermiso}>
                    Se necesita acceso a la cámara.
                </Text>
            </View>
        );
    }

    const procesarCodigo = async (codigo: string) => {
        if (scanned) return;
        setScanned(true);

        try {
            const { resultado, entrada } = await QRService.validar(codigo);
            const estado =
                resultado === 'VALIDA' ? 'valida' :
                    resultado === 'USADA' ? 'usada' : 'invalida';

            router.push({
                pathname: '../resultadoValidacion',
                params: {
                    estado,
                    codigo,
                    equipoLocal: entrada?.equipoLocal,
                    equipoVisitante: entrada?.equipoVisitante,
                    fechaEvento: entrada?.fechaEvento,
                    estadioNombre: entrada?.estadioNombre,
                    sectorCodigo: entrada?.sectorCodigo,
                    numeroAsiento: entrada ? String(entrada.numeroAsiento) : undefined,
                },
            });
        } catch {
            router.push({
                pathname: '../resultadoValidacion',
                params: { estado: 'invalida', codigo },
            });
        } finally {
            setScanned(false);
        }
    };

    return (
        <Screen backgroundColor="#051F3B">
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    Escanear Entrada
                </Text>

                <Text style={styles.subtitulo}>
                    Alineá el código QR dentro del recuadro para validar la entrada.
                </Text>

                <View style={styles.cameraContainer}>
                    {enFoco && (
                        <CameraView
                            style={styles.camera}
                            facing="back"
                            active={enFoco}
                            onBarcodeScanned={({ data }) => procesarCodigo(data)}
                        />
                    )}
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    titulo: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },

    subtitulo: {
        color: '#D1D5DB',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },

    cameraContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
    },

    camera: {
        flex: 1,
    },

    textoPermiso: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
});