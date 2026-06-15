import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

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
    const [qrValue, setQrValue] = useState(`ticket-${id}-${Date.now()}`);

    const generarNuevoQR = () => {
        setQrValue(`ticket-${id}-${Date.now()}`);
    };

    useEffect(() => {
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
    }, [id]);

    return (
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
                        <QRCode value={qrValue} size={110} />
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