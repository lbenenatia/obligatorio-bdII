import { EventoService } from '@/services/EventoService';
import { Evento } from '@/types/evento';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Eventos() {
    const router = useRouter();
    const [eventos, setEventos] = useState<Evento[]>([]);

    useEffect(() => {
        EventoService.listar().then(setEventos).catch(() => {});
    }, []);

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
                {eventos.length === 0 && (
                    <Text style={styles.placeholderText}>
                        No hay eventos creados.
                    </Text>
                )}
                {eventos.map((evento) => (
                    <View key={evento.id} style={styles.eventRow}>

                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>
                                {evento.equipoLocal.nombreEquipo} vs {evento.equipoVisitante.nombreEquipo}
                            </Text>

                            <Text style={styles.eventDetail}>
                                {evento.fechaEvento} - {evento.horaEvento}
                            </Text>

                            <Text style={styles.eventDetail}>
                                {evento.estadio.nombreEstadio}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.arrowButton}
                            onPress={() =>
                                router.push({
                                    pathname: '/administrador/evento',
                                    params: {
                                        id: evento.id,
                                    },
                                })
                            }>
                            <Ionicons
                                name="chevron-forward"
                                size={28}
                                color="#6B7280"
                            />
                        </TouchableOpacity>

                    </View>
                ))}

            </View>

        </View >
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
