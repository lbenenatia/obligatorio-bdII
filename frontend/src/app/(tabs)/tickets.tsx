import { useRouter } from 'expo-router';
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
};

const ticketsMock: Ticket[] = [
    { id: '1', match: 'México vs Sudáfrica', date: '11 JUN - 16:00', time: 'Estadio Banorte' },
    { id: '2', match: 'México vs Sudáfrica', date: '11 JUN - 16:00', time: 'Estadio Banorte' },
    { id: '3', match: 'México vs Sudáfrica', date: '11 JUN - 16:00', time: 'Estadio Banorte' },
];

export default function TicketsScreen() {
    const router = useRouter();
    const renderItem: ListRenderItem<Ticket> = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.topInfo}>
                <Text style={styles.title}>{item.match}</Text>
                <Text style={styles.subtitle}>{item.date}</Text>
                <Text style={styles.subtitle}>{item.time}</Text>
            </View>

            <View style={styles.bottomRow}>
                <Text style={styles.ticketInfo}>2 entradas</Text>

                <TouchableOpacity
                    style={styles.ticketButton}
                    onPress={() => router.push('/compra')}
                >
                    <Text style={styles.ticketButtonText}>Ver ticket</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* BUSCADOR */}
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
                />
            </View>

            {/* FILTROS */}
            <View style={styles.filters}>
                <TouchableOpacity style={styles.activeFilter}>
                    <Text style={styles.activeFilterText}>Todos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.inactiveFilter}>
                    <Text style={styles.inactiveFilterText}>Hoy</Text>
                </TouchableOpacity>
            </View>

            {/* LISTA DE TICKETS */}
            <FlatList<Ticket>
                data={ticketsMock}
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
        marginLeft: 36,
    },

    ticketButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});