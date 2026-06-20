import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EscanearEntrada() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const router = useRouter();

    const validarQR = (data: string) => {
        try {
            const parsed = JSON.parse(data);

            const timeWindow = Math.floor(Date.now() / 30000);

            const expectedSignature = `SIG-${parsed.ticketId}-${timeWindow}`;

            return parsed.signature === expectedSignature;
        } catch (e) {
            return false;
        }
    };

    if (!permission) return <View style={styles.container} />;

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

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Escanear Entrada</Text>

            <Text style={styles.subtitulo}>
                Alineá el código QR dentro del recuadro para validar la entrada.
            </Text>

            <View style={styles.cameraContainer}>
                <CameraView
                    style={styles.camera}
                    facing="back"
                    onBarcodeScanned={({ data }) => {
                        if (scanned) return;

                        setScanned(true);

                        const esValido = validarQR(data);

                        router.push({
                            pathname: '../resultadoValidacion',
                            params: {
                                estado: esValido ? 'valida' : 'invalida',
                                codigo: data,
                            },
                        });
                    }}
                />
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    padding: 15,
                    marginTop: 20,
                    borderRadius: 10,
                }}
                onPress={() =>
                    router.push({
                        pathname: '../resultadoValidacion',
                        params: {
                            estado: 'valida',
                            codigo: 'TEST-123',
                        },
                    })
                }
            >
                <Text>SIMULAR QR (TEST)</Text>
            </TouchableOpacity>
             <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    padding: 15,
                    marginTop: 20,
                    borderRadius: 10,
                }}
                onPress={() =>
                    router.push({
                        pathname: '../resultadoValidacion',
                        params: {
                            estado: 'invalida',
                            codigo: 'TEST-123',
                        },
                    })
                }
            >
                <Text>SIMULAR QR (TEST)</Text>
            </TouchableOpacity>
             <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    padding: 15,
                    marginTop: 20,
                    borderRadius: 10,
                }}
                onPress={() =>
                    router.push({
                        pathname: '../resultadoValidacion',
                        params: {
                            estado: 'usada',
                            codigo: 'TEST-123',
                        },
                    })
                }
            >
                <Text>SIMULAR QR (TEST)</Text>
            </TouchableOpacity>
        </View>
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