import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Perfil() {
    const router = useRouter();
    return (
        <View style={styles.container}>

            {/* HEADER */}
            <FontAwesome name="user-circle" size={90} color="#FFFFFF" />
            <Text style={styles.nombre}>Juan Pérez</Text>

            {/* CARD */}
            <View style={styles.centerContainer}>
                <View style={styles.card}>

                    <Text style={styles.cardTitle}>Información personal</Text>

                    {/* EMAIL */}
                    <View style={styles.block}>
                        <Text style={styles.label}>Correo electrónico</Text>
                        <Text style={styles.value}>juanperez@email.com</Text>
                    </View>

                    {/* TELÉFONO */}
                    <View style={styles.block}>
                        <Text style={styles.label}>Teléfono</Text>
                        <Text style={styles.value}>+598 99 123 456</Text>
                    </View>

                    {/* DOCUMENTO */}
                    <View style={styles.block}>
                        <Text style={styles.label}>Documento</Text>
                        <Text style={styles.value}>CI - Uruguay</Text>
                        <Text style={styles.subvalue}>5.123.456-7</Text>
                    </View>

                    {/* DIRECCIÓN */}
                    <View style={styles.block}>
                        <Text style={styles.label}>Dirección</Text>
                        <Text style={styles.value}>Uruguay</Text>
                        <Text style={styles.subvalue}>Melo</Text>
                        <Text style={styles.subvalue}>Saravia 123 - CP 37000</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.botonCerrarSesion} onPress={() => router.push('/')}>
                    <FontAwesome name="sign-out" size={18} color="#FFFFFF" />
                    <Text style={styles.textoCerrarSesion}>Cerrar sesión</Text>
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
        paddingTop: 80,
    },

    nombre: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },

    card: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 22,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 18,
        color: '#051F3B',
        textAlign: 'center',
    },

    block: {
        marginBottom: 18,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    label: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
    },

    value: {
        fontSize: 15,
        color: '#111827',
        fontWeight: '600',
    },

    subvalue: {
        fontSize: 14,
        color: '#374151',
        marginTop: 2,
    },
    botonCerrarSesion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DC2626',
        width: '90%',
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 20,
    },

    textoCerrarSesion: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});