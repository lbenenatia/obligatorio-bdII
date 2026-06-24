import { QRService } from '@/services/QRService';
import { FontAwesome6 } from '@expo/vector-icons';
import * as Print from 'expo-print';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from './screen';

export default function PagoAprobado() {
    const router = useRouter();
    const { compraId, entradaIds, match, date, time, estadio, sector, cantidad } =
        useLocalSearchParams<{
            compraId: string;
            entradaIds: string;
            match: string;
            date: string;
            time: string;
            estadio: string;
            sector: string;
            cantidad: string;
        }>();

    const primeraEntradaId = Number(entradaIds?.split(',')[0]);

    return (
        <Screen>
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
                        ¡Compra realizada!
                    </Text>

                    <Text style={styles.subtitle}>
                        Su compra ha sido confirmada. ¡Disfruta el mundial 2026!
                    </Text>
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.primaryButton}
                        onPress={() => router.push('/misEntradas')}>
                        <Text style={styles.primaryButtonText}>
                            Ver mis entradas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton}
                        onPress={() => router.push('/(tabs)/home')}>
                        <Text style={styles.secondaryButtonText}>
                            Volver al inicio
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },

    successContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
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
        paddingHorizontal: 10,
    },

    actionsContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 16,
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
        fontWeight: '400',
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
        fontWeight: '400',
    },
});
