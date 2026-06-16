import { useCompras } from '@/context/ComprasContext';
import { FontAwesome6 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUsuarioLogueado } from '../data/sesion';

export default function PagoScreen() {
    const router = useRouter();
    const { agregarCompra } = useCompras();
    const usuario = getUsuarioLogueado();

    const {
        eventoId,
        match,
        date,
        time,
        sector,
        cantidad,
        precio,
        estadio,
    } = useLocalSearchParams();

    const [metodoPago, setMetodoPago] = useState('tarjeta');

    const cantidadNum = Number(cantidad ?? 0);
    const precioNum = Number(precio ?? 0);

    const subtotal = cantidadNum * precioNum;
    const comision = subtotal * 0.05;
    const total = subtotal + comision;

    const finalizarPago = () => {
        const compra = {
            id: String(Date.now()),
            usuarioId: usuario?.id ?? 0,
            eventoId: Number(eventoId ?? 0),
            match: String(match),
            date: String(date),
            time: String(time),
            estadio: String(estadio),
            sector: sector as 'A' | 'B',

            cantidad: cantidadNum,
            precioUnitario: precioNum,
            total,

            transferido: false,
        };

        agregarCompra(compra);

        router.push('/pagoAprobado');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Paso 1 de 2</Text>

            <View style={styles.paymentCard}>
                <View style={styles.topSection}>
                    <View style={styles.textGroup}>
                        <Text style={styles.matchTitle}>
                            {match ?? 'Partido'}
                        </Text>

                        <Text style={styles.sectorText}>
                            Sector {sector ?? '-'}
                        </Text>

                        <Text style={styles.ticketCount}>
                            {cantidadNum} entradas
                        </Text>
                    </View>
                </View>

                <View style={styles.bottomSection}>
                    <View style={styles.row}>
                        <Text style={styles.bottomText}>Entradas</Text>
                        <Text style={styles.priceText}>USD {subtotal}</Text>
                    </View>

                    <Text style={styles.bottomText}>Comisión 5%</Text>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.footerText}>TOTAL</Text>
                        <Text style={styles.footerText}>
                            USD {total.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.paymentOption}
                onPress={() => setMetodoPago('tarjeta')}
            >
                <View style={styles.optionLeft}>
                    <FontAwesome6 name="credit-card" size={24} color="#000" />
                    <Text style={styles.paymentOptionText}>Tarjeta</Text>
                </View>
                <View
                    style={[
                        styles.radioButton,
                        metodoPago === 'tarjeta' && styles.radioButtonSelected,
                    ]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.paymentOption}
                onPress={() => setMetodoPago('paypal')}
            >
                <View style={styles.optionLeft}>
                    <FontAwesome6 name="paypal" size={24} color="#003087" />
                    <Text style={styles.paymentOptionText}>PayPal</Text>
                </View>
                <View
                    style={[
                        styles.radioButton,
                        metodoPago === 'paypal' && styles.radioButtonSelected,
                    ]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.paymentOption}
                onPress={() => setMetodoPago('applepay')}
            >
                <View style={styles.optionLeft}>
                    <FontAwesome6 name="apple-pay" size={24} color="#000" />
                    <Text style={styles.paymentOptionText}>Apple Pay</Text>
                </View>
                <View
                    style={[
                        styles.radioButton,
                        metodoPago === 'applepay' && styles.radioButtonSelected,
                    ]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={finalizarPago}
            >
                <Text style={styles.buttonText}>
                    Finalizar pago
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 40,
    },
    backButton: {
        position: 'absolute',
        top: 55,
        left: 18,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(25, 88, 208, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },

    backText: {
        color: '#1958D0',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: -2,
    },
    logo: {
        width: '60%',
        height: 120,
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 8,
        marginBottom: 22,
    },

    paymentCard: {
        width: '70%',
        height: 250,
        borderWidth: 1,
        borderColor: '#C5C5C5',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
    },

    topSection: {
        height: 110,
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 10,
    },

    textGroup: {
        alignItems: 'flex-start',
        marginBottom: 10,
    },

    matchTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
    },

    sectorText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 4,
    },

    ticketCount: {
        fontSize: 18,
        color: '#000000',
        marginBottom: 8,
    },

    bottomSection: {
        flex: 1,
        backgroundColor: '#EFEFEF',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    bottomText: {
        fontSize: 18,
        color: '#000000',
        marginBottom: 8,
    },

    priceText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '600',
    },

    divider: {
        height: 1,
        backgroundColor: '#C5C5C5',

        marginVertical: 10,

        marginLeft: -20,
        marginRight: -20,
    },

    footerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },

    paymentOption: {
        width: '70%',
        height: 58,

        borderWidth: 1,
        borderColor: '#C5C5C5',
        borderRadius: 12,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingHorizontal: 16,
        marginBottom: 12,

        backgroundColor: '#FFFFFF',
    },

    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    paymentOptionText: {
        marginLeft: 12,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },

    radioButton: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#1958D0',
        backgroundColor: '#FFFFFF',
    },

    radioButtonSelected: {
        backgroundColor: '#1958D0',
    },

    button: {
        width: '90%',
        height: 55,
        backgroundColor: '#1958D0',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'regular',
    },
});