import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


export default function MisEntradas() {
    const [tab, setTab] = useState('proximos');
    const router = useRouter();
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.logo}>⚽ MUNDI26</Text>

                <Text style={styles.title}>Mis entradas</Text>

                <Text style={styles.subtitle}>
                    Aquí puedes ver todas las entradas que has comprado.
                </Text>
            </View>

            {/* TABS */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        tab === 'proximos' && styles.activeTab,
                    ]}
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
                    style={[
                        styles.tab,
                        tab === 'historial' && styles.activeTab,
                    ]}
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

            {/* CONTENIDO */}
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {tab === 'proximos' ? (
                    <>
                        <View style={styles.resumeCard}>
                            <Text style={styles.resumeTitle}>
                                🎟️ 3 entradas activas
                            </Text>
                            <Text style={styles.resumeSubtitle}>
                                Disponibles para tus próximos eventos.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.ticketCard}
                            activeOpacity={0.7}
                            onPress={() => {
                                console.log('CLICK');
                                router.push('/entrada');
                            }}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.badge}>
                                    PRÓXIMO
                                </Text>
                            </View>

                            <Text style={styles.matchTitle}>
                                Uruguay vs Brasil
                            </Text>

                            <Text style={styles.info}>
                                📅 28/06/2026 • 16:00
                            </Text>

                            <Text style={styles.info}>
                                📍 Estadio Centenario
                            </Text>

                            <View style={styles.bottomRow}>
                                <View style={styles.status}>
                                    <Text style={styles.statusText}>
                                        Activa
                                    </Text>
                                </View>

                                <Text style={styles.arrow}>›</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.ticketCard}
                            onPress={() => router.push('/entrada')}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.badge}>
                                    PRÓXIMO
                                </Text>
                            </View>

                            <Text style={styles.matchTitle}>
                                España vs Argentina
                            </Text>

                            <Text style={styles.info}>
                                📅 21/06/2026 • 18:00
                            </Text>

                            <Text style={styles.info}>
                                📍 Estadio BBVA
                            </Text>

                            <View style={styles.bottomRow}>
                                <View style={styles.status}>
                                    <Text style={styles.statusText}>
                                        Activa
                                    </Text>
                                </View>

                                <Text style={styles.arrow}>›</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.ticketCard}
                            onPress={() => router.push('/entrada')}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.badge}>
                                    PRÓXIMO
                                </Text>
                            </View>

                            <Text style={styles.matchTitle}>
                                México vs Sudáfrica
                            </Text>

                            <Text style={styles.info}>
                                📅 11/06/2026 • 20:00
                            </Text>

                            <Text style={styles.info}>
                                📍 Estadio Azteca
                            </Text>

                            <View style={styles.bottomRow}>
                                <View style={styles.status}>
                                    <Text style={styles.statusText}>
                                        Activa
                                    </Text>
                                </View>

                                <Text style={styles.arrow}>›</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity style={styles.ticketCard}>
                            <Text style={styles.matchTitle}>
                                Francia vs Alemania
                            </Text>

                            <Text style={styles.info}>
                                📅 01/05/2026 • 17:00
                            </Text>

                            <Text style={styles.info}>
                                📍 Stade de France
                            </Text>

                            <View style={styles.bottomRow}>
                                <View
                                    style={[
                                        styles.status,
                                        styles.usedStatus,
                                    ]}
                                >
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
                    </>
                )}
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
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

    resumeCard: {
        backgroundColor: '#EAF2FF',
        padding: 18,
        borderRadius: 18,
        marginBottom: 18,
    },

    resumeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#001B54',
    },

    resumeSubtitle: {
        color: '#4B5563',
        marginTop: 4,
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
});