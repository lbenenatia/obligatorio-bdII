import { FontAwesome6 } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>¡Hola Juan!</Text>
                    <Text style={styles.headerSubtitle}>Listo para vivir el mundial 2026</Text>
                </View>

                <Image
                    source={require('../../../assets/images/loguito.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Componente de información */}
            <View style={styles.infoCard}>
                <Text style={styles.text1}>PROXIMO EVENTO</Text>
                <Text style={styles.text2}>México vs Sudáfrica</Text>
                <Text style={styles.text3}>11 JUN - 16:00</Text>
                <Text style={styles.text4}>Estadio Banorte, Ciudad de México</Text>
            </View>

            {/* Componente inferior */}
            <View style={styles.bottomCard}>
                {/* Header horizontal */}
                <View style={styles.bottomHeader}>
                    <Text style={styles.bottomTitle}>Mis entradas</Text>
                    <Text style={styles.bottomAction}>Ver todos</Text>
                </View>

                {/* Item tipo ticket */}
                <View style={styles.ticketRow}>
                    <FontAwesome6 name="ticket" size={45} color="#000" />

                    <Text style={styles.ticketText}>
                        Entradas 2
                    </Text>

                    <Text style={styles.ticketArrow}>{'>'}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',

        justifyContent: 'space-between', // 👈 CLAVE
    },

    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        height: 100, // importante para centrar verticalmente con el logo
        justifyContent: 'center',
    },

    logo: {
        position: 'absolute',
        top: 19, // ajusta fino para centrar con el texto
        right: 20,
        height: 62,
        width: 62,
    },

    headerTextContainer: {
        justifyContent: 'center',
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 8, // 👈 separación entre textos
    },

    headerSubtitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    infoCard: {
        marginTop: 44,
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',

        // 👇 centra todo vertical y horizontalmente dentro del card
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 190,
    },

    text1: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 16,
    },

    text2: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        color: '#000',
    },

    text3: {
        fontSize: 16,
        color: '#374151',
        marginBottom: 16,
    },

    text4: {
        fontSize: 16,
        fontWeight: '700',
        color: '#374151',
    },

    bottomCard: {
        height: 262,

        backgroundColor: '#FFFFFF',

        padding: 16,

        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,

        marginBottom: 0, // importante

        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },

    bottomHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 22,
    },

    bottomTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },

    bottomAction: {
        fontSize: 14,
        color: '#1565FF',
        fontWeight: '600',
    },

    ticketRow: {
        flexDirection: 'row',
        alignItems: 'center', // 👈 centra verticalmente todo

        paddingVertical: 12,
        paddingHorizontal: 12,

        borderRadius: 12,
        height: 84,
        backgroundColor: '#F0F0F0',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },

    ticketText: {
        fontSize: 16,
        color: '#111827',

        marginLeft: 70, // 👈 distancia entre icono y texto
    },

    ticketArrow: {
        fontSize: 18,
        color: '#6B7280',

        marginLeft: 95, // 👈 distancia entre texto y >
    },
});