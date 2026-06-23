import { FuncionarioService } from '@/services/FuncionarioService';
import { Evento } from '@/types/evento';
import { DispositivoAsignado, SectorAsignado } from '@/types/funcionario';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Screen from '../../screen';

export default function Perfil() {
    const [sectores, setSectores] = useState<SectorAsignado[]>([]);
    const [evento, setEvento] = useState<Evento | undefined>(undefined);
    const [dispositivo, setDispositivo] = useState<DispositivoAsignado | undefined>(undefined);

    useEffect(() => {
        FuncionarioService.miSector().then(setSectores).catch(() => { });
        FuncionarioService.miEvento().then(setEvento).catch(() => { });
        FuncionarioService.miDispositivo().then(setDispositivo).catch(() => { });
    }, []);

    const nombresSectores = sectores.map(s => `Sector ${s.codigo}`).join(', ');
    const estadioAsignado = sectores[0]?.estadio;

    return (
        <Screen backgroundColor="#051F3B">
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/images/logo_blanco.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>👋 ¡Hola Funcionario!</Text>
                    <Text style={styles.subtitle}>Bienvenido al sistema de validación</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitulo}>Evento asignado</Text>

                    {evento ? (
                        <>
                            <Text style={styles.partido}>
                                {evento.equipoLocal.nombreEquipo} vs {evento.equipoVisitante.nombreEquipo}
                            </Text>

                            <Text style={styles.detalle}>
                                {evento.fechaEvento}
                            </Text>

                            <Text style={styles.detalle}>
                                {evento.estadio.nombreEstadio}
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.detalle}>
                            Sin evento asignado
                        </Text>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitulo}>Sector asignado</Text>
                    <Text style={styles.cardValor}>
                        {nombresSectores || 'Sin sector asignado'}
                    </Text>

                    {estadioAsignado && (
                        <Text style={styles.detalle}>
                            {estadioAsignado.nombreEstadio}
                        </Text>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitulo}>Dispositivo</Text>

                    <Text style={styles.cardValor}>
                        {dispositivo?.dispositivoId ?? 'Sin dispositivo vinculado'}
                    </Text>

                    {dispositivo && (
                        <View style={styles.estadoContainer}>
                            <Text style={styles.estadoTexto}>
                                Estado:
                            </Text>

                            <View
                                style={[
                                    styles.estadoCirculo,
                                    !dispositivo.autorizado && styles.estadoCirculoInactivo,
                                ]}
                            />

                            <Text style={styles.estadoTexto}>
                                {dispositivo.autorizado ? 'Autorizado' : 'No autorizado'}
                            </Text>
                        </View>
                    )}
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
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 18,
        marginBottom: 15,
    },

    cardTitulo: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '600',
        marginBottom: 8,
    },
    partido: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#051F3B',
        marginBottom: 8,
    },

    detalle: {
        fontSize: 15,
        color: '#6B7280',
        marginTop: 2,
    },
    cardValor: {
        fontSize: 20,
        color: '#051F3B',
        fontWeight: 'bold',
    },
    estadoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    estadoCirculo: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#22C55E',
        marginHorizontal: 8,
    },

    estadoCirculoInactivo: {
        backgroundColor: '#DC2626',
    },

    estadoTexto: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
    },
});
