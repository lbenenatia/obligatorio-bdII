import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet, Text,
    TouchableOpacity,
    View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';


export default function Transfer() {
    const [seconds, setSeconds] = useState(30);
    const [qrValue, setQrValue] = useState(`ticket-${Date.now()}`);

    const generarNuevoQR = () => {
        setQrValue(`ticket-${Date.now()}`);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    generarNuevoQR();
                    return 30;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const router = useRouter();
    return (
        <View style={styles.container}>
            {/* LOGO PRINCIPAL */}
            <Image
                source={require('../../assets/images/logo_blanco.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* TARJETA */}
            <View style={styles.mainCard}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.cardLogo}
                    resizeMode="contain"
                />

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                        México vs Sudáfrica
                    </Text>

                    <Text style={styles.subtitle}>
                        11 JUN - 16:00 • Sector A, Asiento 15
                    </Text>

                    <View style={styles.divider} />

                    <View style={styles.qrContainer}>
                        <QRCode
                            value={qrValue}
                            size={99}
                        />
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
                    onPress={() => router.push('/transfer')}
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },

    cardLogo: {
        width: 166,
        height: 57,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },

    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    refreshIcon: {
        fontSize: 26,
        color: '#000',
        marginRight: 10,
    },

    timerText: {
        fontSize: 16,
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
        width: '100%',
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
        width: '100%',
        height: 55,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondaryButtonText: {
        color: '#ffffff‰',
        fontSize: 18,
        fontWeight: 'bold',
    },
});