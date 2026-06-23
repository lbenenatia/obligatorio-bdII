import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { EntradaService } from '@/services/EntradaService';
import { Entrada } from '@/types/entrada';
import Screen from '../screen';

export default function MisEntradas() {
    const [tab, setTab] = useState<'proximos' | 'historial'>('proximos');
    const [entradas, setEntradas] = useState<Entrada[]>([]);
    const router = useRouter();

    useEffect(() => {
        EntradaService.misEntradas().then(setEntradas).catch(() => {});
    }, []);

    const entradasActivas = entradas.filter(e => e.estado !== 'CONSUMIDA');
    const entradasUsadas = entradas.filter(e => e.estado === 'CONSUMIDA');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mis entradas</Text>

                <Text style={styles.subtitle}>
                    Aquí puedes ver todas las entradas que has comprado.
                </Text>
            </View>

            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, tab === 'proximos' && styles.activeTab]}
                    onPress={() => setTab('proximos')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            tab === 'proximos' && styles.activeTabText,
                        ]}
                    >
                        Próximos eventos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, tab === 'historial' && styles.activeTab]}
                    onPress={() => setTab('historial')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            tab === 'historial' && styles.activeTabText,
                        ]}
                    >
                        Historial
                    </Text>
                </TouchableOpacity>
            </View>

            <Screen backgroundColor="#051F3B">

                {tab === 'proximos' &&
                    (entradasActivas.length === 0 ? (
                        <Text style={styles.emptyText}>
                            No tienes entradas próximas
                        </Text>
                    ) : (
                        entradasActivas.map(e => (
                            <TouchableOpacity
                                key={e.id}
                                style={styles.ticketCard}
                                onPress={() =>
                                    router.push({
                                        pathname: '/entrada',
                                        params: {
                                            id: e.id.toString(),
                                            equipoLocal: e.equipoLocal,
                                            equipoVisitante: e.equipoVisitante,
                                            fecha: e.fechaEvento,
                                            time: e.horaEvento,
                                            estadio: e.estadioNombre,
                                            sector: e.sectorCodigo,
                                            asiento: String(e.numeroAsiento),
                                        },
                                    })
                                }
                            >
                                <View style={styles.cardHeader}>
                                    <Text style={styles.badge}>PRÓXIMO</Text>
                                </View>

                                <Text style={styles.matchTitle}>
                                    {e.equipoLocal} vs {e.equipoVisitante}
                                </Text>

                                <Text style={styles.info}>📅 {e.fechaEvento}</Text>
                                <Text style={styles.info}>🕒 {e.horaEvento}</Text>
                                <Text style={styles.info}>📍 {e.estadioNombre}</Text>

                                <View style={styles.bottomRow}>
                                    <View style={styles.status}>
                                        <Text style={styles.statusText}>Activa</Text>
                                    </View>

                                    <Text style={styles.arrow}>›</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ))}
                {tab === 'historial' &&
                    (entradasUsadas.length === 0 ? (
                        <Text style={styles.emptyText}>
                            No tienes entradas usadas
                        </Text>
                    ) : (
                        entradasUsadas.map(e => (
                            <TouchableOpacity key={e.id} style={styles.ticketCard}>
                                <Text style={styles.matchTitle}>
                                    {e.equipoLocal} vs {e.equipoVisitante}
                                </Text>

                                <Text style={styles.info}>📅 {e.fechaEvento}</Text>
                                <Text style={styles.info}>🕒 {e.horaEvento}</Text>
                                <Text style={styles.info}>📍 {e.estadioNombre}</Text>

                                <View style={styles.bottomRow}>
                                    <View style={[styles.status, styles.usedStatus]}>
                                        <Text
                                            style={[
                                                styles.statusText,
                                                styles.usedStatusText,
                                            ]}
                                        >
                                            Utilizada
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ))}
            </Screen>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
    },

    header: {
        backgroundColor: '#051F3B',
        paddingTop: 70,
        paddingHorizontal: 25,
        paddingBottom: 50,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    logo: {
        color: '#FFFFFF',
        width: 150,
        height: 150,
        fontWeight: 'bold',
    },

    title: {
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    subtitle: {
        color: '#D8E1F0',
        fontSize: 16,
        lineHeight: 24,
    },

    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: -25,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 3,
    },

    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
    },

    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#2563EB',
    },

    tabText: {
        color: '#6B7280',
        fontWeight: '600',
        fontSize: 15,
    },

    activeTabText: {
        color: '#2563EB',
    },

    content: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
    },

    ticketCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 12,
    },

    badge: {
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 'bold',
    },

    matchTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 12,
    },

    info: {
        fontSize: 15,
        color: '#475569',
        marginBottom: 8,
    },

    bottomRow: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    status: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    statusText: {
        color: '#166534',
        fontWeight: '600',
    },

    usedStatus: {
        backgroundColor: '#E5E7EB',
    },

    usedStatusText: {
        color: '#6B7280',
    },

    arrow: {
        fontSize: 30,
        color: '#001B54',
        fontWeight: '300',
    },
    emptyText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        opacity: 0.7,
    },
});
