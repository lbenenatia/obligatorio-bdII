import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResultadoValidacion() {
    const {
        estado,
        equipoLocal,
        equipoVisitante,
        fechaEvento,
        estadioNombre,
        sectorCodigo,
        numeroAsiento,
    } = useLocalSearchParams<{
        estado: string;
        equipoLocal?: string;
        equipoVisitante?: string;
        fechaEvento?: string;
        estadioNombre?: string;
        sectorCodigo?: string;
        numeroAsiento?: string;
    }>();
    const router = useRouter();

    const esValida = estado === 'valida';
    const esInvalida = estado === 'invalida';
    const esUsada = estado === 'usada';

    return (
        <View
            style={[
                styles.container,
                esValida && { backgroundColor: '#DCFCE7' },
                esInvalida && { backgroundColor: '#FEE2E2' },
                esUsada && { backgroundColor: '#FEF3C7' },
            ]}
        >

            {/* ICONO */}
            <View
                style={[
                    styles.icono,
                    esValida && { backgroundColor: '#22C55E' },
                    esInvalida && { backgroundColor: '#EF4444' },
                    esUsada && { backgroundColor: '#F59E0B' },
                ]}
            >
                {esValida && <Ionicons name="checkmark" size={60} color="#fff" />}
                {esInvalida && <Ionicons name="close" size={60} color="#fff" />}
                {esUsada && <Ionicons name="warning" size={60} color="#fff" />}
            </View>

            {/* TITULO */}
            <Text style={styles.titulo}>
                {esValida && 'Entrada válida'}
                {esInvalida && 'Entrada inválida'}
                {esUsada && 'Entrada ya utilizada'}
            </Text>

            {/* SUBMENSAJE */}
            <Text style={styles.submensaje}>
                {esValida && 'La entrada es válida y puede ingresar al evento.'}
                {esInvalida && 'El código QR no es válido. Verifica e intenta nuevamente.'}
                {esUsada && 'Esta entrada ya fue utilizada anteriormente.'}
            </Text>

            {/* CARD */}
            <View style={styles.card}>

                <Text style={styles.tituloPartido}>
                    {equipoLocal && equipoVisitante
                        ? `${equipoLocal} vs ${equipoVisitante}`
                        : 'Entrada no identificada'}
                </Text>

                <Text style={styles.fecha}>
                    {fechaEvento ?? ''}
                </Text>

                <Text style={styles.estadio}>
                    {estadioNombre ?? ''}
                </Text>

                {/* SOLO VALIDA TIENE DETALLE COMPLETO */}
                {esValida && (
                    <>
                        <View style={styles.divisor} />

                        <View style={styles.fila}>
                            <Text style={styles.label}>Sector</Text>
                            <Text style={styles.valor}>Sector {sectorCodigo}</Text>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.label}>Asiento</Text>
                            <Text style={styles.valor}>{numeroAsiento}</Text>
                        </View>
                    </>
                )}

                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => router.replace('/funcionario/(tabs)/escanearEntrada')}
                >
                    <Text style={styles.textoBoton}>
                        Volver a escanear
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
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 10,
    },

    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },

    submensaje: {
        fontSize: 14,
        textAlign: 'center',
        color: '#374151',
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    card: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    tituloPartido: {
        fontSize: 18,
        fontWeight: '700',
    },

    fecha: {
        fontSize: 13,
        color: '#6B7280',
    },

    estadio: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 10,
    },

    divisor: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 10,
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
        fontWeight: '600',
        color: '#111827',
    },

    boton: {
        marginTop: 12,
        backgroundColor: '#1E90FF',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },

    textoBoton: {
        color: '#fff',
        fontWeight: '700',
    },
});