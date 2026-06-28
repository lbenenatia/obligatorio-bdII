import { FuncionarioService } from '@/services/FuncionarioService';
import { QRService } from '@/services/QRService';
import { obtenerNroVinculacion } from '@/utils/dispositivo';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect, useIsFocused, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../screen';

export default function EscanearEntrada() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [nroVinculacion, setNroVinculacion] = useState<string | null>(null);
    const [autorizado, setAutorizado] = useState<boolean | null>(null);
    const router = useRouter();
    // La camara solo debe estar prendida mientras esta pantalla esta activamente en foco:
    // si el funcionario cambia de tab, se apaga (se desmonta), y se reprende solo al volver.
    const enFoco = useIsFocused();

    // Se revisa en cada foco (no solo al montar) porque el admin puede autorizar el
    // dispositivo mientras el funcionario ya tiene esta pantalla abierta en otra tab.
    useFocusEffect(
        useCallback(() => {
            let activo = true;

            (async () => {
                const idLocal = await obtenerNroVinculacion();
                if (!activo) return;
                setNroVinculacion(idLocal);

                try {
                    const miDispositivo = await FuncionarioService.miDispositivo();
                    const ok = !!miDispositivo
                        && miDispositivo.nroVinculacion === idLocal
                        && miDispositivo.autorizado;
                    if (activo) setAutorizado(ok);
                } catch {
                    if (activo) setAutorizado(false);
                }
            })();

            return () => {
                activo = false;
            };
        }, [])
    );

    const procesarCodigo = async (codigo: string) => {
        if (scanned || !nroVinculacion) return;
        setScanned(true);

        try {
            const { resultado, entrada } = await QRService.validar(codigo, nroVinculacion);
            const estado =
                resultado === 'VALIDA' ? 'valida' :
                    resultado === 'USADA' ? 'usada' :
                        resultado === 'DISPOSITIVO_NO_AUTORIZADO' ? 'no_autorizado' : 'invalida';

            router.push({
                pathname: '/funcionario/resultadoValidacion',
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
                pathname: '/funcionario/resultadoValidacion',
                params: { estado: 'invalida', codigo },
            });
        } finally {
            setScanned(false);
        }
    };

    if (autorizado === null) {
        return <View style={styles.container} />;
    }

    if (!autorizado) {
        return (
            <Screen backgroundColor="#051F3B">
                <View style={styles.container}>
                    <Text style={styles.titulo}>
                        Escanear Entrada
                    </Text>

                    <Text style={styles.textoPermiso}>
                        Tu dispositivo todavía no está autorizado para escanear entradas.
                        Pedile a un administrador que vincule este ID a tu cuenta:
                    </Text>

                    <Text style={styles.idDispositivo}>
                        {nroVinculacion}
                    </Text>
                </View>
            </Screen>
        );
    }

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
                            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
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

    idDispositivo: {
        color: '#051F3B',
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginTop: 20,
    },
});
