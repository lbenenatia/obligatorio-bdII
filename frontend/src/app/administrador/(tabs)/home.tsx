import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Perfil() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/images/logo_blanco.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.textContainer}>
                <Text style={styles.title}>👋 ¡Hola Admin!</Text>
                <Text style={styles.subtitle}>Administrador - Uruguay</Text>
            </View>

            <View style={styles.grid}>
                {/* Eventos activos */}
                <View style={styles.card}>
                    <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
                        <MaterialCommunityIcons
                            name="calendar-check"
                            size={28}
                            color="#16A34A"
                        />
                    </View>

                    <Text style={styles.cardTitle}>Eventos Activos</Text>
                    <Text style={styles.cardNumber}>12</Text>
                </View>

                {/* Entradas vendidas */}
                <View style={styles.card}>
                    <View style={[styles.iconCircle, { backgroundColor: '#DBEAFE' }]}>
                        <Ionicons
                            name="ticket-outline"
                            size={28}
                            color="#2563EB"
                        />
                    </View>

                    <Text style={styles.cardTitle}>Entradas Vendidas</Text>
                    <Text style={styles.cardNumber}>1.250</Text>
                </View>

                {/* Usuarios registrados */}
                <View style={styles.card}>
                    <View style={[styles.iconCircle, { backgroundColor: '#EDE9FE' }]}>
                        <Ionicons
                            name="people-outline"
                            size={28}
                            color="#7C3AED"
                        />
                    </View>

                    <Text style={styles.cardTitle}>Usuarios Registrados</Text>
                    <Text style={styles.cardNumber}>856</Text>
                </View>

                {/* Transferencias */}
                <View style={styles.card}>
                    <View style={[styles.iconCircle, { backgroundColor: '#FFEDD5' }]}>
                        <Ionicons
                            name="swap-horizontal"
                            size={28}
                            color="#EA580C"
                        />
                    </View>

                    <Text style={styles.cardTitle}>Transferencias</Text>
                    <Text style={styles.cardNumber}>1.203</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        paddingTop: 40,
        paddingHorizontal: 20,
    },

    logo: {
        width: '60%',
        height: 120,
        alignSelf: 'center',
    },

    textContainer: {
        width: '100%',
        marginBottom: 30,
    },

    title: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },

    subtitle: {
        color: '#D1D5DB',
        fontSize: 18,
        marginTop: 5,
        textAlign: 'left',
    },

    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
    },

    card: {
        width: '47%',
        aspectRatio: 0.9, // mantiene proporción automáticamente
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 18,
        marginBottom: 18,
    },

    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFF7ED',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },

    cardNumber: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
    },
});