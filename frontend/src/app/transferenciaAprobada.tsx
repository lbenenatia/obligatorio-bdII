import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function PagoScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            {/* COMPONENTE 1 - CONFIRMACIÓN */}
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

            {/* COMPONENTE 2 - ACCIONES */}
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

    /* COMPONENTE 1 */

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

    /* COMPONENTE 2 */

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

    secondaryButton: {
        width: 280,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondaryButtonText: {
        color: '#1958D0',
        fontSize: 25,
        fontWeight: 'regular',
    },

    /* COMPONENTE 3 */

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        height: 115,
        backgroundColor: '#D9D9D9',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        gap: 12,
    },

    footerButton: {
        width: 150,
        height: 48,

        backgroundColor: '#FFFFFF',
        borderRadius: 12,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        gap: 8,
    },

    footerButtonText: {
        color: '#1958D0',
        fontSize: 16,
        fontWeight: '600',
    },
});