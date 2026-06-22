import { useAuth } from '@/context/AuthContext';
import { EventoService } from '@/services/EventoService';
import { Evento } from '@/types/evento';
import { hoyLocalISO } from '@/utils/fecha';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { usuario } = useAuth();
    const [proximoEvento, setProximoEvento] =
        useState<Evento | null>(null);

    useEffect(() => {
        const cargarEvento = async () => {
            const eventos = await EventoService.listar();
            const hoy = hoyLocalISO();

            const proximos = eventos
                .filter(e => e.fechaEvento >= hoy)
                .sort((a, b) => a.fechaEvento.localeCompare(b.fechaEvento));

            setProximoEvento(proximos[0] ?? null);
        };

        cargarEvento().catch(() => {});
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>
                        ¡Hola {usuario?.nombre}!
                    </Text>
                    <Text style={styles.headerSubtitle}>Listo para vivir el mundial 2026</Text>
                </View>

                <Image
                    source={require('../../../assets/images/loguito.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.infoCard}>
                    <Text style={styles.text1}>PROXIMO EVENTO</Text>
                    <Text style={styles.text2}>
                        {proximoEvento
                            ? `${proximoEvento.equipoLocal.nombreEquipo} vs ${proximoEvento.equipoVisitante.nombreEquipo}`
                            : 'Sin eventos próximos'}
                    </Text>

                    <Text style={styles.text3}>
                        {proximoEvento?.fechaEvento} - {proximoEvento?.horaEvento}
                    </Text>

                    <Text style={styles.text4}>
                        {proximoEvento?.estadio.nombreEstadio}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
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
});
