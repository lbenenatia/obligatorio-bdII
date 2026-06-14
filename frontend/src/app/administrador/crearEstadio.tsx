import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TransferenciaAprobada() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name="football-outline" size={45} color="#FFF" />
            </View>
            <Text style={styles.title}>Crear Estadio</Text>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Nombre del estadio</Text>
                <TextInput
                    placeholder="Ej. Estadio Nacional"
                    placeholderTextColor="#6B7280"
                    style={styles.input}
                />
                <Text style={styles.label}>País</Text>
                <TextInput
                    placeholder="México"
                    placeholderTextColor="#6B7280"
                    style={styles.input}
                />
                <Text style={styles.label}>Ciudad</Text>
                <TextInput
                    placeholder="Ej. Ciudad de México"
                    placeholderTextColor="#6B7280"
                    style={styles.input}
                />
                <Text style={styles.label}>Capacidad total</Text>
                <TextInput
                    placeholder="Ej. 8700"
                    placeholderTextColor="#6B7280"
                    keyboardType="numeric"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/administrador/sectores')}>
                    <Text style={styles.saveButtonText}>
                        Guardar estadio
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
        padding: 20,
        justifyContent: 'center',
    },
    iconContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#0A2F57',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 15,
    },

    title: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    formContainer: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 25,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,

        elevation: 8,
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        marginLeft: 2,
    },

    input: {
        height: 55,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 18,
        backgroundColor: '#F9FAFB',
        color: '#111827',
    },

    saveButton: {
        backgroundColor: '#1958D0',
        height: 58,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    saveButtonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
});