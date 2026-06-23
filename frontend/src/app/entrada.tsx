import { useAuth } from '@/context/AuthContext';
import { QRService } from '@/services/QRService';
import { mostrarAlerta } from '@/utils/alert';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Screen from './screen';

type EntradaParams = {
    id: string;
    equipoLocal: string;
    equipoVisitante: string;
    fecha: string;
    time: string;
    estadio: string;
    sector?: string;
    asiento?: string;
};

export default function EntradaScreen() {
    const router = useRouter();
    const { usuario } = useAuth();

    const {
        id,
        equipoLocal,
        equipoVisitante,
        fecha,
        time,
        estadio,
        sector,
        asiento,
    } = useLocalSearchParams<EntradaParams>();

    const [seconds, setSeconds] = useState(30);
    const [qrValue, setQrValue] = useState<string | null>(null);

    // Evita refrescar el QR si la sesión se cerró o la app no está en primer plano
    // (sino se sigue pegando al back en segundo plano o ya deslogueado, y tira 403).
    const enPrimerPlanoRef = useRef(AppState.currentState === 'active');

    const generarNuevoQR = async () => {
        if (!id || !usuario || usuario.rol !== 'GENERAL' || !enPrimerPlanoRef.current) return;
        try {
            const entrada = await QRService.generar(Number(id));
            setQrValue(entrada.codigoQR ?? `entrada-${id}`);
        } catch (error) {
            mostrarAlerta(
                'Error',
                error instanceof Error ? error.message : 'No se pudo generar el código QR'
            );
        }
    };

    useEffect(() => {
        const subscription = AppState.addEventListener('change', estado => {
            enPrimerPlanoRef.current = estado === 'active';
        });

        return () => subscription.remove();
    }, []);

    // useFocusEffect (no useEffect) porque esta pantalla puede quedar montada en el stack
    // de navegación al ir al login: el cleanup de un useEffect normal solo corre al
    // desmontar, pero acá necesitamos pausar el polling en cuanto la pantalla pierde el foco
    // (ej. al cerrar sesión y loguearse con otra cuenta), no solo cuando se destruye.
    useFocusEffect(
        useCallback(() => {
            if (!usuario || usuario.rol !== 'GENERAL') return;

            generarNuevoQR();

            const interval = setInterval(() => {
                setSeconds(prev => {
                    if (prev <= 1) {
                        generarNuevoQR();
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [id, usuario])
    );

    return (
        <Screen backgroundColor="#051F3B">
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>
                {/* LOGO */}
                <Image
                    source={require('../../assets/images/logo_blanco.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.mainCard}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.cardLogo}
                        resizeMode="contain"
                    />

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>
                            {equipoLocal} vs {equipoVisitante}
                        </Text>

                        <Text style={styles.subtitle}>
                            {fecha} • {time}
                            {sector ? ` • Sector ${sector}` : ''}
                            {asiento ? `, Asiento ${asiento}` : ''}
                        </Text>

                        <View style={styles.divider} />

                        <View style={styles.qrContainer}>
                            {qrValue && <QRCode value={qrValue} size={110} />}
                        </View>

                        <View style={styles.timerContainer}>
                            <Text style={styles.refreshIcon}>↻</Text>

                            <Text style={styles.timerText}>
                                El código QR se actualiza en:{' '}
                                <Text style={styles.timerBold}>
                                    00:{seconds < 10 ? `0${seconds}` : seconds}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() =>
                            router.push({
                                pathname: '/transfer',
                                params: {
                                    id: id,
                                    match: `${equipoLocal} vs ${equipoVisitante}`,
                                    date: fecha,
                                    time: time,
                                    estadio: estadio,
                                    sector: sector,
                                    cantidad: asiento,
                                },
                            })
                        }
                    >
                        <Text style={styles.primaryButtonText}>
                            Transferir entrada
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.push('/home')}
                    >
                        <Text style={styles.secondaryButtonText}>
                            Volver al inicio
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },

    backText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: -2,
    },

    logo: {
        width: '50%',
        height: 100,
        marginBottom: 20,
    },

    mainCard: {
        width: '90%',
        height: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        alignItems: 'center',
        elevation: 8,
    },

    cardLogo: {
        width: 160,
        height: 55,
        position: 'absolute',
        top: 15,
    },

    contentContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 80,
        paddingHorizontal: 35,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 25,
    },

    divider: {
        width: '120%',
        height: 1,
        backgroundColor: '#BDBDBD',
        marginBottom: 12,
    },

    qrContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    refreshIcon: {
        fontSize: 22,
        marginRight: 8,
    },

    timerText: {
        fontSize: 14,
        color: '#000',
    },

    timerBold: {
        fontWeight: 'bold',
    },

    buttonsContainer: {
        width: '90%',
        marginTop: 25,
    },

    primaryButton: {
        height: 55,
        backgroundColor: '#1958D0',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    secondaryButton: {
        height: 55,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});