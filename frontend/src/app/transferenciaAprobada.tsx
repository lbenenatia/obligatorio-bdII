import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function PagoScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.successContainer}>
                <View style={styles.iconContainer}>
                    <FontAwesome6
                        name="check"
                        size={90}
                        color="#FFFFFF"
                    />
                </View>

                <Text style={styles.title}>
                    ¡Transferencia realizada!
                </Text>

                <Text style={styles.subtitle}>
                    Su transferencia ha sido confirmada.
                </Text>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.primaryButton}
                    onPress={() => router.push('/home')}>
                    <Text style={styles.primaryButtonText}>
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
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    successContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    iconContainer: {
        width: 140,
        height: 140,
        borderRadius: 90,
        backgroundColor: '#67D661',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 18,
        color: '#6B7280',
        textAlign: 'center',
    },

    actionsContainer: {
        alignItems: 'center',
        gap: 16,
        marginTop: 50,
    },

    primaryButton: {
        width: 340,
        height: 62,
        backgroundColor: '#1958D0',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'regular',
    },
});