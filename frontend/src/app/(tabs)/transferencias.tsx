import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { TransferenciaService } from '@/services/TransferenciaService';
import { Transferencia } from '@/types/transferencia';
import Screen from '../screen';

const ESTADO_STYLES: Record<Transferencia['estado'], { badge: object; texto: object; label: string }> = {
    PENDIENTE: { badge: { backgroundColor: '#FEF3C7' }, texto: { color: '#D97706' }, label: 'Pendiente' },
    ACEPTADA: { badge: { backgroundColor: '#DCFCE7' }, texto: { color: '#16A34A' }, label: 'Aceptada' },
    RECHAZADA: { badge: { backgroundColor: '#FEE2E2' }, texto: { color: '#DC2626' }, label: 'Rechazada' },
};

export default function Transferencias() {
    const { usuario } = useAuth();
    const [transferencias, setTransferencias] = useState<Transferencia[]>([]);

    useFocusEffect(
        useCallback(() => {
            TransferenciaService.misTransferencias().then(setTransferencias).catch(() => { });
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Transferencias</Text>

                <Text style={styles.subtitle}>
                    Historial de entradas que enviaste y recibiste.
                </Text>
            </View>

            <Screen backgroundColor="#051F3B">
                <View style={styles.content}>
                    {transferencias.length === 0 ? (
                        <Text style={styles.emptyText}>
                            No tenés transferencias todavía
                        </Text>
                    ) : (
                        transferencias.map(t => {
                            const esRemitente = t.remitenteEmail === usuario?.email;
                            const estadoStyle = ESTADO_STYLES[t.estado];

                            return (
                                <View key={t.id} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <View style={[styles.badge, estadoStyle.badge]}>
                                            <Text style={[styles.badgeText, estadoStyle.texto]}>
                                                {estadoStyle.label}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text style={styles.matchTitle}>
                                        {t.equipoLocal} vs {t.equipoVisitante}
                                    </Text>

                                    <Text style={styles.info}>📅 {t.fechaEvento}</Text>
                                    <Text style={styles.info}>🎟️ Sector {t.sectorCodigo}</Text>
                                    <Text style={styles.info}>
                                        {esRemitente
                                            ? `📤 Enviada a ${t.destinatarioEmail}`
                                            : `📥 Recibida de ${t.remitenteEmail}`}
                                    </Text>
                                </View>
                            );
                        })
                    )}
                </View>
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
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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

    content: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,
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
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },

    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },

    matchTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 10,
    },

    info: {
        fontSize: 15,
        color: '#475569',
        marginBottom: 8,
    },

    emptyText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        opacity: 0.7,
    },
});
