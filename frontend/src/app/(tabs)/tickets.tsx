import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
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

type Ticket = {
    id: string;
    match: string;
    date: string;
    time: string;
    estadio: string;
};

// Mock
const ticketsMock: Ticket[] = [
    {
        id: '1',
        match: 'México vs Sudáfrica',
        date: '2026-07-11',
        time: '16:00', 
        estadio: 'Estadio Banorte',
    },
    {
        id: '2',
        match: 'Argentina vs Brasil',
        date: '2026-07-14',
        time: '18:00',
        estadio: 'Estadio Azteca',
    },
    {
        id: '3',
        match: 'Uruguay vs España',
        date: '2026-07-14',
        time: '20:00',
        estadio: 'Estadio Centenario',
    },
];

export default function TicketsScreen() {
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'todos' | 'hoy'>('todos');
    const hoy = new Date().toISOString().split('T')[0];
    // 🔎 FILTRO + BUSCADOR
    const filteredTickets = useMemo(() => {
        return ticketsMock.filter((t) => {
            const matchSearch =
                t.match.toLowerCase().includes(search.toLowerCase());

            // SOLO hoy o futuros (no pasados)
            const esDisponible = t.date >= hoy;

            const matchFilter =
                filter === 'todos'
                    ? esDisponible
                    : t.date === hoy;

            return matchSearch && matchFilter;
        });
    }, [search, filter]);

    const renderItem: ListRenderItem<Ticket> = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.topInfo}>
                <Text style={styles.title}>{item.match}</Text>
                <Text style={styles.subtitle}>{item.date}</Text>
                <Text style={styles.subtitle}>{item.time} - {item.estadio}</Text>
            </View>

            <View style={styles.bottomRow}>
                <TouchableOpacity
                    style={styles.ticketButton}
                    onPress={() =>
                        router.push({
                            pathname: '/compra',
                            params: {
                                id: item.id,
                                match: item.match,
                                date: item.date,
                                time: item.time,
                                estadio: item.estadio,
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
                keyExtractor={(item) => item.id}
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
        fontWeight: 'semibold',
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

    ticketInfo: {
        fontSize: 16,
        color: '#000000',
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