import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CompraScreen() {
    const router = useRouter();
    const [cantidad, setCantidad] = useState(1);
    const [sectorSeleccionado, setSectorSeleccionado] = useState<'A' | 'B'>('B');
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/images/estadio.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>México vs Sudáfrica</Text>
                <Text style={styles.subtitle}>11 JUN - 16:00</Text>
                <Text style={styles.subtitle}>Estadio Banorte</Text>
            </View>
            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={[
                        styles.optionCard,
                        sectorSeleccionado === 'A'
                            ? styles.optionCardSelected
                            : styles.optionCardInactive,
                    ]}
                    onPress={() => setSectorSeleccionado('A')}
                >
                    <View style={styles.radioContainer}>
                        <View
                            style={[
                                styles.radio,
                                sectorSeleccionado === 'A'
                                    ? styles.radioSelected
                                    : styles.radioInactive,
                            ]}
                        />
                    </View>

                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>Sector A</Text>
                        <Text style={styles.optionSubtitle}>USD 150</Text>
                    </View>

                    <Text style={styles.optionPrice}>Quedan 45</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.optionCard,
                        sectorSeleccionado === 'B'
                            ? styles.optionCardSelected
                            : styles.optionCardInactive,
                    ]}
                    onPress={() => setSectorSeleccionado('B')}
                >
                    <View style={styles.radioContainer}>
                        <View
                            style={[
                                styles.radio,
                                sectorSeleccionado === 'B'
                                    ? styles.radioSelected
                                    : styles.radioInactive,
                            ]}
                        />
                    </View>

                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>Sector B</Text>
                        <Text style={styles.optionSubtitle}>USD 200</Text>
                    </View>

                    <Text style={styles.optionPrice}>Quedan 30</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.counterContainer}>
                <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setCantidad(Math.max(0, cantidad - 1))}
                >
                    <Text style={styles.counterButtonText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.counterValue}>{cantidad}</Text>

                <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setCantidad(cantidad + 1)}
                >
                    <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.summaryCard}>
                <Text style={styles.summaryText}>
                    Sub Total:{' '}
                    <Text style={styles.summaryTextBold}>
                        USD {cantidad * 200}
                    </Text>
                </Text>

                <TouchableOpacity style={styles.summaryButton}>
                    <Text style={styles.summaryButtonText}
                        onPress={() => router.push('/pago')}>
                        Continuar compra</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    imageContainer: {
        width: '100%',
        backgroundColor: '#0C437B',
        height: 200,
    },
    image: {
        marginTop: 40,
        width: '100%',
        height: 173,
    },
    content: {
        padding: 20,
        gap: 12,
        alignItems: 'center', // centra el bloque de contenido
        marginTop: 17, // superpone el bloque sobre la imagen
    },

    title: {
        width: '90%', // ancho del bloque de texto
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },

    subtitle: {
        width: '80%',
        color: '#000',
        fontSize: 20,
        textAlign: 'left',
        marginTop: -6, // ajusta fino para acercar los textos
    },
    optionsContainer: {
        marginTop: -10,
        gap: 16,
    },
    optionCard: {
        width: '90%',
        height: 110,
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 2,
    },

    optionCardSelected: {
        backgroundColor: 'rgba(50, 93, 233, 0.3)', // #325DE9 al 30%
        borderColor: 'rgba(0, 12, 246, 0.4)', // #000CF6 al 40%
    },

    optionCardInactive: {
        backgroundColor: 'rgba(185, 191, 210, 0.3)', // #B9BFD2 al 30%
        borderColor: 'rgba(68, 68, 69, 0.4)', // #444445 al 40%
    },

    radioContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
    },

    radioSelected: {
        backgroundColor: 'rgba(50, 93, 233, 0.3)',
        borderColor: 'rgba(0, 12, 246, 0.4)',
    },

    radioInactive: {
        backgroundColor: 'rgba(185, 191, 210, 0.3)',
        borderColor: 'rgba(68, 68, 69, 0.4)',
    },

    optionTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    optionTitle: {
        fontSize: 20,
        fontWeight: 'regular',
        color: '#000',
    },

    optionSubtitle: {
        fontSize: 20,
        color: '#374151',
        marginTop: 4,
    },

    optionPrice: {
        fontSize: 20,
        fontWeight: 'regular',
        color: '#374151',
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    counterButton: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)', // borde al 30%
    },

    counterButtonText: {
        color: '#000000',
        fontSize: 25,
        fontWeight: 'regular',
    },

    counterValue: {
        marginHorizontal: 40,
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
    },
    summaryCard: {
        width: '90%',
        height: 126,
        alignSelf: 'center',
        backgroundColor: '#1958D0',
        borderRadius: 20,

        marginTop: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },

    summaryText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'regular',
        marginBottom: 15,
    },

    summaryTextBold: {
        fontWeight: 'bold',
    },

    summaryButton: {
        width: 250,
        height: 45,

        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 12,

        backgroundColor: 'transparent',

        justifyContent: 'center',
        alignItems: 'center',
    },

    summaryButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'regular',
    },
});