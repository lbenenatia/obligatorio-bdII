import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Image, ScrollView, StyleSheet, Text, TextInput,
    TouchableOpacity, View
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
            <View style={styles.bottomContainer}>
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: 100,
                    }}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.mainTitle}>
                            Transferir entrada
                        </Text>

                        <Text style={styles.subtitle2}>
                            México vs Sudáfrica, Sector A, Asiento 15
                        </Text>

                        <Text style={styles.description}>
                            Buscar un usuario por email
                        </Text>
                    </View>

                    {/* Buscador */}
                    <View style={styles.searchContainer}>
                        <Text style={styles.searchIcon}>⌕</Text>

                        <TextInput
                            placeholder="ejemplo@correo.com"
                            placeholderTextColor="#999"
                            style={styles.searchInput}
                        />
                    </View>

                    {/* Usuario encontrado */}
                    <View style={styles.userFoundContainer}>
                        <View style={styles.checkCircle}>
                            <Text style={styles.checkText}>✓</Text>
                        </View>

                        <Text style={styles.userFoundText}>
                            Usuario encontrado:{' '}
                            <Text style={styles.userName}>
                                Juan Perez
                            </Text>
                        </Text>
                    </View>

                    {/* Botones */}
                    <TouchableOpacity style={styles.primaryButton}
                    onPress={() => router.push('/transferenciaAprobada')}>
                        <Text style={styles.primaryButtonText}>
                            Confirmar transferencia
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton}
                    onPress={() => router.push('/home')}>
                        <Text style={styles.secondaryButtonText}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        alignItems: 'center',
    },

    logo: {
        width: '50%',
        height: 100,
        marginTop: 40,
    },

    mainCard: {
        width: '90%',
        height: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        marginTop: 10,
        alignItems: 'center',
        position: 'relative',
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
    bottomContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: '#FFFFFF',

        marginTop: -25, // superpone 8px sobre el componente anterior

        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',

        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4, // sombra hacia arriba
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 10,
    },
    headerTextContainer: {
        width: '85%',
        alignSelf: 'center',
    },

    mainTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        marginBottom: 6,
    },

    subtitle2: {
        fontSize: 17,
        color: '#000',
        textAlign: 'left',
        marginBottom: 16,
    },

    description: {
        fontSize: 16,
        color: '#000',
        textAlign: 'left',
    },

    searchContainer: {
        width: '90%',
        height: 38,
        borderWidth: 1,
        borderColor: '#C5C5C5',
        borderRadius: 30,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
    },

    searchIcon: {
        fontSize: 24,
        color: '#999',
        marginRight: 10,
    },

    searchInput: {
        flex: 1,
        fontSize: 18,
        color: '#000',
    },

    userFoundContainer: {
        width: '90%',
        height: 45,
        backgroundColor: '#D9D9D9',
        borderRadius: 16,
        marginTop: 20,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkCircle: {
        width: 30,
        height: 30,
        borderRadius: 17.5,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    checkText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    userFoundText: {
        fontSize: 16,
        color: '#000',
    },

    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    primaryButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#1958D0',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },

    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },

    secondaryButton: {
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderColor: '#1958D0',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },

    secondaryButtonText: {
        color: '#1958D0',
        fontSize: 20,
        fontWeight: 'semibold',
    },
});