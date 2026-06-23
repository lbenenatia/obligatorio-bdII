import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { CompraService } from '@/services/CompraService';
import { EventoService } from '@/services/EventoService';
import { TransferenciaService } from '@/services/TransferenciaService';
import { UsuarioService } from '@/services/UsuarioService';
import Screen from '../../screen';

export default function Perfil() {
    const { usuario } = useAuth();

    const [eventosActivos, setEventosActivos] = useState(0);
    const [entradasVendidas, setEntradasVendidas] = useState(0);
    const [usuariosRegistrados, setUsuariosRegistrados] = useState(0);
    const [transferencias, setTransferencias] = useState(0);

    useEffect(() => {
        EventoService.listar()
            .then(eventos => setEventosActivos(eventos.length))
            .catch(() => { });

        CompraService.listarTodas()
            .then(compras =>
                setEntradasVendidas(compras.reduce((acc, c) => acc + c.cantEntradas, 0))
            )
            .catch(() => { });

        UsuarioService.contar()
            .then(setUsuariosRegistrados)
            .catch(() => { });

        TransferenciaService.listarTodas()
            .then(transferencias => setTransferencias(transferencias.length))
            .catch(() => { });
    }, []);

    return (
        <Screen backgroundColor="#051F3B">
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/images/logo_blanco.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        👋 ¡Hola {usuario?.nombre || 'Admin'}!
                    </Text>

                    <Text style={styles.subtitle}>
                        {usuario?.rol || 'ADMINISTRADOR'}
                    </Text>
                </View>

                <View style={styles.grid}>

                    {/* EVENTOS */}
                    <View style={styles.card}>
                        <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
                            <MaterialCommunityIcons
                                name="calendar-check"
                                size={28}
                                color="#16A34A"
                            />
                        </View>

                        <Text style={styles.cardTitle}>Eventos</Text>
                        <Text style={styles.cardNumber}>
                            {eventosActivos}
                        </Text>
                    </View>

                    {/* ENTRADAS */}
                    <View style={styles.card}>
                        <View style={[styles.iconCircle, { backgroundColor: '#DBEAFE' }]}>
                            <Ionicons
                                name="ticket-outline"
                                size={28}
                                color="#2563EB"
                            />
                        </View>

                        <Text style={styles.cardTitle}>Entradas Vendidas</Text>
                        <Text style={styles.cardNumber}>
                            {entradasVendidas}
                        </Text>
                    </View>

                    {/* USUARIOS */}
                    <View style={styles.card}>
                        <View style={[styles.iconCircle, { backgroundColor: '#EDE9FE' }]}>
                            <Ionicons
                                name="people-outline"
                                size={28}
                                color="#7C3AED"
                            />
                        </View>

                        <Text style={styles.cardTitle}>
                            Usuarios
                        </Text>
                        <Text style={styles.cardNumber}>
                            {usuariosRegistrados}
                        </Text>
                    </View>

                    {/* TRANSFERENCIAS */}
                    <View style={styles.card}>
                        <View style={[styles.iconCircle, { backgroundColor: '#FFEDD5' }]}>
                            <Ionicons
                                name="swap-horizontal"
                                size={28}
                                color="#EA580C"
                            />
                        </View>

                        <Text style={styles.cardTitle}>
                            Transferencias
                        </Text>
                        <Text style={styles.cardNumber}>
                            {transferencias}
                        </Text>
                    </View>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        paddingTop: 40,
        paddingHorizontal: 20,
    },

    logo: {
        width: '60%',
        height: 120,
        alignSelf: 'center',
    },

    textContainer: {
        width: '100%',
        marginBottom: 30,
    },

    title: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },

    subtitle: {
        color: '#D1D5DB',
        fontSize: 18,
        marginTop: 5,
        textAlign: 'left',
    },

    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
    },

    card: {
        width: '47%',
        aspectRatio: 0.9, // mantiene proporción automáticamente
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 18,
        marginBottom: 18,
    },

    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFF7ED',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },

    cardNumber: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
    },
});
