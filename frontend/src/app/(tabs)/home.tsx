import { useCompras } from '@/context/ComprasContext';
import { useEventos } from '@/context/EventosContext';
import { useTransferencias } from '@/context/TransferenciasContext';
import { getUsuarioLogueado } from '@/data/sesion';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { eventos, obtenerProximoEvento } = useEventos();
    const { transferencias, aceptarTransferencia, rechazarTransferencia } = useTransferencias();
    const usuario = getUsuarioLogueado();
    const { compras } = useCompras();

    const misTransferencias = transferencias.filter(
        t => t.aUsuarioId === usuario?.id && t.estado === 'PENDIENTE'
    );

    const proximoEvento = useMemo(() => {
        return obtenerProximoEvento();
    }, [eventos]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>
                        ¡Hola {usuario?.nombre}!
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Listo para vivir el mundial 2026
                    </Text>
                </View>

                <Image
                    source={require('../../../assets/images/loguito.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.infoCard}>

                    {proximoEvento ? (
                        <>
                            <Text style={styles.text1}>
                                PRÓXIMO EVENTO
                            </Text>

                            <Text style={styles.text2}>
                                {proximoEvento.paisLocal} vs {proximoEvento.paisVisitante}
                            </Text>

                            <Text style={styles.text3}>
                                {proximoEvento.fecha} - {proximoEvento.hora}
                            </Text>

                            <Text style={styles.text4}>
                                {proximoEvento.estadio}
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text style={styles.text2}>
                                🎉 No hay eventos programados
                            </Text>

                            <Text style={styles.text3}>
                                Creá un evento desde administrador
                            </Text>
                        </>
                    )}

                </View>
            </View>
            {misTransferencias.length > 0 && (
                <View style={styles.transferCard}>
                    <Text style={styles.transferTitle}>
                        Transferencias pendientes
                    </Text>

                    {misTransferencias.map(t => {
                        const compra = compras.find(c => c.id === t.compraId);

                        if (!compra) return null;

                        return (
                            <View key={t.id} style={styles.transferItem}>
                                <Text style={styles.transferText}>
                                     <Text style={{ fontWeight: '600' }}>{compra.match}</Text>
                                </Text>

                                <Text style={styles.transferText}>
                                    {compra.date} • {compra.time}
                                </Text>

                                <Text style={styles.transferText}>
                                    {compra.estadio}
                                </Text>

                                <Text style={styles.transferText}>
                                    Sector: {compra.sector}
                                </Text>

                                <View style={styles.transferButtons}>
                                    <TouchableOpacity
                                        style={styles.acceptBtn}
                                        onPress={() => aceptarTransferencia(t.id)}
                                    >
                                        <Text style={styles.btnText}>Aceptar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.rejectBtn}
                                        onPress={() => rechazarTransferencia(t.id)}
                                    >
                                        <Text style={styles.btnText}>Rechazar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            )}

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',

        justifyContent: 'space-between',
    },

    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        height: 100,
        justifyContent: 'center',
    },

    logo: {
        position: 'absolute',
        top: 19,
        right: 20,
        height: 62,
        width: 62,
    },

    headerTextContainer: {
        justifyContent: 'center',
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    headerSubtitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
    },
    infoCard: {
        width: '90%',
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        height: 190,
    },

    text1: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 16,
    },

    text2: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        color: '#000',
    },

    text3: {
        fontSize: 16,
        color: '#374151',
        marginBottom: 16,
    },

    text4: {
        fontSize: 16,
        fontWeight: '700',
        color: '#374151',
    },
    transferCard: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
        marginBottom: 25,
        alignSelf: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    transferTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 15,
        textAlign: 'center',
    },

    transferItem: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },

    transferText: {
        fontSize: 15,
        color: '#475569',
        marginBottom: 8,
    },

    transferButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },

    acceptBtn: {
        flex: 1,
        backgroundColor: '#16A34A',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 6,
    },

    rejectBtn: {
        flex: 1,
        backgroundColor: '#DC2626',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 6,
    },

    btnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
});