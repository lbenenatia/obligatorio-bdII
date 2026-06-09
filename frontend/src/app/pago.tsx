import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function PagoScreen() {
    const [metodoPago, setMetodoPago] = useState('tarjeta');
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* LOGO */}
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* TÍTULO */}
            <Text style={styles.title}>Paso 1 de 2</Text>

            {/* OPCIONES */}
            <View style={styles.paymentCard}>
                {/* PARTE SUPERIOR */}
                <View style={styles.topSection}>
                    <View style={styles.textGroup}>
                        <Text style={styles.matchTitle}>México vs Sudáfrica</Text>
                        <Text style={styles.sectorText}>Sector A</Text>
                        <Text style={styles.ticketCount}>2 entradas</Text>
                    </View>
                </View>

                {/* PARTE INFERIOR */}
                <View style={styles.bottomSection}>
                    {/* Primera fila */}
                    <View style={styles.row}>
                        <Text style={styles.bottomText}>Entradas</Text>
                        <Text style={styles.priceText}>USD 300</Text>
                    </View>

                    {/* Segunda fila */}
                    <Text style={styles.bottomText}>Comisión 5%</Text>

                    {/* Separador */}
                    <View style={styles.divider} />

                    {/* Última fila */}
                    <View style={styles.row}>
                        <Text style={styles.footerText}>TOTAL</Text>
                        <Text style={styles.footerText}>USD 315</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.paymentOption}
                onPress={() => setMetodoPago('tarjeta')}
            >
                <View style={styles.optionLeft}>
                    <FontAwesome6 name="credit-card" size={24} color="#000" />

                    <Text style={styles.paymentOptionText}>
                        Tarjeta
                    </Text>
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

                    <Text style={styles.paymentOptionText}>
                        PayPal
                    </Text>
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

                    <Text style={styles.paymentOptionText}>
                        Apple Pay
                    </Text>
                </View>

                <View
                    style={[
                        styles.radioButton,
                        metodoPago === 'applepay' && styles.radioButtonSelected,
                    ]}
                />
            </TouchableOpacity>

            {/* BOTÓN */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() => router.push('/pagoAprobado')}>
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

    paymentText: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
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