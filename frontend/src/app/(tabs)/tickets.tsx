import { EventoService } from '@/services/EventoService';
import { Evento } from '@/types/evento';
import { hoyLocalISO } from '@/utils/fecha';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    ListRenderItem,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { FontAwesome6 } from '@expo/vector-icons';

export default function TicketsScreen() {
    const router = useRouter();

    const [eventos, setEventos] = useState<Evento[]>([]);

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'todos' | 'hoy'>('todos');

    const hoy = hoyLocalISO();

    useEffect(() => {
        EventoService.listar().then(setEventos).catch(() => {});
    }, []);

    const filteredTickets = useMemo(() => {
        return eventos.filter((t) => {
            const partido = `${t.equipoLocal.nombreEquipo} vs ${t.equipoVisitante.nombreEquipo}`;

            const matchSearch = partido
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchFilter =
                filter === 'todos'
                    ? true
                    : t.fechaEvento === hoy;

            return matchSearch && matchFilter;
        });
    }, [eventos, search, filter]);

    const renderItem: ListRenderItem<Evento> = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.topInfo}>
                <Text style={styles.title}>
                    {item.equipoLocal.nombreEquipo} vs {item.equipoVisitante.nombreEquipo}
                </Text>

                <Text style={styles.subtitle}>
                    {item.fechaEvento}
                </Text>

                <Text style={styles.subtitle}>
                    {item.horaEvento} - {item.estadio.nombreEstadio}
                </Text>
            </View>

            <View style={styles.bottomRow}>
                <TouchableOpacity
                    style={styles.ticketButton}
                    onPress={() =>
                        router.push({
                            pathname: '/compra',
                            params: {
                                id: String(item.id),
                                match: `${item.equipoLocal.nombreEquipo} vs ${item.equipoVisitante.nombreEquipo}`,
                                date: item.fechaEvento,
                                time: item.horaEvento,
                                estadio: item.estadio.nombreEstadio,
                            },
                        })
                    }
                >
                    <Text style={styles.ticketButtonText}>
                        Ver ticket
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <FontAwesome6
                    name="magnifying-glass"
                    size={18}
                    color="#6B7280"
                />

                <TextInput
                    placeholder="Buscar partido..."
                    placeholderTextColor="#6B7280"
                    style={styles.search}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <View style={styles.filters}>
                <TouchableOpacity
                    style={
                        filter === 'todos'
                            ? styles.activeFilter
                            : styles.inactiveFilter
                    }
                    onPress={() => setFilter('todos')}
                >
                    <Text
                        style={
                            filter === 'todos'
                                ? styles.activeFilterText
                                : styles.inactiveFilterText
                        }
                    >
                        Todos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        filter === 'hoy'
                            ? styles.activeFilter
                            : styles.inactiveFilter
                    }
                    onPress={() => setFilter('hoy')}
                >
                    <Text
                        style={
                            filter === 'hoy'
                                ? styles.activeFilterText
                                : styles.inactiveFilterText
                        }
                    >
                        Hoy
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredTickets}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        paddingHorizontal: 15,
        paddingTop: 10,
    },

    searchContainer: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 45,
    },

    search: {
        flex: 1,
        marginLeft: 10,
        color: '#6B7280',
        fontSize: 16,
    },

    filters: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
        marginBottom: 15,
        gap: 52,
    },

    activeFilter: {
        width: 94,
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
    },

    inactiveFilter: {
        width: 94,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
    },

    activeFilterText: {
        color: '#000000',
        fontWeight: '500',
    },

    inactiveFilterText: {
        color: '#FFFFFF',
        fontWeight: '500',
    },

    list: {
        paddingBottom: 20,
        paddingTop: 31,
    },

    card: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        height: 143,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 28,
        justifyContent: 'space-between',
    },

    topInfo: {
        alignItems: 'center',
        gap: 4,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 16,
        color: '#374151',
        textAlign: 'center',
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    ticketButton: {
        width: 119,
        height: 36,
        backgroundColor: '#1565FF',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ticketButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
