import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { useCompras } from '@/context/ComprasContext';
import { getUsuarioLogueado } from '../../data/sesion';

export default function MisEntradas() {
    const [tab, setTab] = useState<'proximos' | 'historial'>('proximos');
    const usuario = getUsuarioLogueado();
    const { compras } = useCompras();
    const router = useRouter();

    const entradas = compras
        .filter(c => c.usuarioId === usuario?.id)
        .map(c => ({
            id: c.id,
            equipoLocal: c.match.split(' vs ')[0],
            equipoVisitante: c.match.split(' vs ')[1],
            fecha: c.date,
            time: c.time,
            estadio: c.estadio,
            sector: c.sector,
            asiento: `${c.sector}-${c.id.slice(-3)}`,
            estado: c.transferido ? 'TRANSFERIDA' : 'ACTIVA',
        }));
    const entradasActivas = entradas.filter(e => e.estado === 'ACTIVA');
    const entradasTransferidas = entradas.filter(e => e.estado === 'TRANSFERIDA');

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
                    <Text style={[styles.tabText, tab === 'proximos' && styles.activeTabText]}>
                        Activas
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, tab === 'historial' && styles.activeTab]}
                    onPress={() => setTab('historial')}
                >
                    <Text style={[styles.tabText, tab === 'historial' && styles.activeTabText]}>
                        Transferidas
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                {tab === 'proximos' &&
                    (entradasActivas.length === 0 ? (
                        <Text style={styles.emptyText}>
                            No tienes entradas activas
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
                                            fecha: e.fecha,
                                            time: e.time,
                                            estadio: e.estadio,
                                            sector: e.sector,
                                            asiento: e.asiento,
                                        },
                                    })
                                }
                            >
                                <Text style={styles.matchTitle}>
                                    {e.equipoLocal} vs {e.equipoVisitante}
                                </Text>

                                <Text style={styles.info}>📅 {e.fecha}</Text>
                                <Text style={styles.info}>🕒 {e.time}</Text>
                                <Text style={styles.info}>📍 {e.estadio}</Text>

                                <View style={styles.bottomRow}>
                                    <Text style={styles.statusText}>Activa</Text>
                                    <Text style={styles.arrow}>›</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ))}

                {tab === 'historial' &&
                    (entradasTransferidas.length === 0 ? (
                        <Text style={styles.emptyText}>
                            No tienes entradas transferidas
                        </Text>
                    ) : (
                        entradasTransferidas.map(e => (
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
                                            fecha: e.fecha,
                                            time: e.time,
                                            estadio: e.estadio,
                                            sector: e.sector,
                                            asiento: e.asiento,
                                        },
                                    })
                                }
                            >
                                <Text style={styles.matchTitle}>
                                    {e.equipoLocal} vs {e.equipoVisitante}
                                </Text>

                                <Text style={styles.info}>📅 {e.fecha}</Text>
                                <Text style={styles.info}>🕒 {e.time}</Text>
                                <Text style={styles.info}>📍 {e.estadio}</Text>

                                <View style={styles.bottomRow}>
                                    <Text style={styles.statusText}>
                                        Transferida
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ))}
            </ScrollView>
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