import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Perfil() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil del Funcionario</Text>
            <Text style={styles.subtitle}>Nombre: Juan Pérez</Text>
            <Text style={styles.subtitle}>Cargo: Coordinador de Eventos</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
        marginBottom: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#051F3B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});