import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResultadoValidacion() {
    const { estado } = useLocalSearchParams();
    const router = useRouter();

    const esValida = estado === 'valida';
    const esInvalida = estado === 'invalida';
    const esUsada = estado === 'usada';

    const color =
        esValida ? '#22C55E' :
        esInvalida ? '#EF4444' :
        '#F59E0B';

    const titulo =
        esValida ? 'Entrada válida' :
        esInvalida ? 'Entrada inválida' :
        'Entrada ya utilizada';

    const sub =
        esValida ? 'Puede ingresar al evento' :
        esInvalida ? 'Código QR inválido' :
        'Esta entrada ya fue escaneada';

    const icon =
        esValida ? 'checkmark' :
        esInvalida ? 'close' :
        'warning';

    return (
        <View style={[styles.container, { backgroundColor: `${color}15` }]}>

            <View style={[styles.icono, { backgroundColor: color }]}>
                <Ionicons name={icon} size={50} color="#fff" />
            </View>

            <Text style={styles.titulo}>{titulo}</Text>

            <Text style={styles.submensaje}>{sub}</Text>

            <View style={styles.card}>

                <View style={styles.headerCard}>
                    <Text style={styles.partido}>Equipo A vs Equipo B</Text>

                    <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
                        <Text style={[styles.badgeText, { color }]}>
                            {estado?.toString().toUpperCase()}
                        </Text>
                    </View>
                </View>

                <Text style={styles.meta}>📅 12/06/2026</Text>
                <Text style={styles.meta}>🏟 Estadio Centenario</Text>

                <View style={styles.divisor} />

                {esValida && (
                    <>
                        <View style={styles.fila}>
                            <Text style={styles.label}>Sector</Text>
                            <Text style={styles.valor}>B</Text>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.label}>Asiento</Text>
                            <Text style={styles.valor}>15 / 12</Text>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.label}>Tipo</Text>
                            <Text style={styles.valor}>General</Text>
                        </View>
                    </>
                )}

                <TouchableOpacity
                    style={[styles.boton, { backgroundColor: color }]}
                    onPress={() => router.replace('/funcionario/(tabs)/escanearEntrada')}
                >
                    <Text style={styles.textoBoton}>
                        Escanear otra entrada
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },

    icono: {
        width: 90,
        height: 90,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },

    titulo: {
        fontSize: 24,
        fontWeight: '800',
        color: '#111827',
    },

    submensaje: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 20,
    },

    card: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 18,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },

    headerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    partido: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        flex: 1,
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: '700',
    },

    meta: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 4,
    },

    divisor: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },

    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },

    label: {
        color: '#6B7280',
    },

    valor: {
        fontWeight: '700',
        color: '#111827',
    },

    boton: {
        marginTop: 14,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },

    textoBoton: {
        color: '#fff',
        fontWeight: '700',
    },
});