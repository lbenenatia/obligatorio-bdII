import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Eventos() {
    const router = useRouter();
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Eventos</Text>

            <View style={styles.headerActions}>
                <View />
                <TouchableOpacity style={styles.addButton}
                onPress={() => router.push(`/administrador/nuevoEvento`)}>
                    <Ionicons name="add" size={22} color="#FFF" />
                    <Text style={styles.addButtonText}>Nuevo Evento</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>

                {[
                    {
                        id: 1,
                        partido: 'Uruguay vs Argentina',
                        fecha: '15/06/2026 - 20:00',
                        estadio: 'Estadio Centenario',
                    },
                    {
                        id: 2,
                        partido: 'Brasil vs México',
                        fecha: '18/06/2026 - 18:00',
                        estadio: 'Arena Pernambuco',
                    },
                    {
                        id: 3,
                        partido: 'España vs Francia',
                        fecha: '20/06/2026 - 21:00',
                        estadio: 'Santiago Bernabéu',
                    },
                ].map((evento) => (
                    <View key={evento.id} style={styles.eventRow}>

                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>
                                {evento.partido}
                            </Text>

                            <Text style={styles.eventDetail}>
                                {evento.fecha}
                            </Text>

                            <Text style={styles.eventDetail}>
                                {evento.estadio}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.arrowButton}
                        onPress={() => router.push(`/administrador/evento`)}>
                            <Ionicons
                                name="chevron-forward"
                                size={28}
                                color="#6B7280"
                            />
                        </TouchableOpacity>

                    </View>
                ))}

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        padding: 20,
    },

    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
    },

    headerActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },

    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#16A34A',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
    },

    addButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 6,
    },

    contentContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },

    placeholderText: {
        color: '#6B7280',
        fontSize: 16,
    },
    eventRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,

        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    eventInfo: {
        flex: 1,
    },

    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 6,
    },

    eventDetail: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 2,
    },

    arrowButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },
});