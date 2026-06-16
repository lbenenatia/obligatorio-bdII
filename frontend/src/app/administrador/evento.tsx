import { useCompras } from '@/context/ComprasContext';
import { useEventos } from '@/context/EventosContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Evento() {
    const [tabActiva, setTabActiva] = useState('informacion');
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { eventos, eliminarEvento } = useEventos();
    const { compras } = useCompras();
    const evento = eventos.find(
        (e) => e.id === Number(id)
    );

    if (!evento) {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    Evento no encontrado
                </Text>
            </View>
        );
    }
    const capacidad = evento.capacidad;
    const entradasVendidas = compras
        .filter(c => c.eventoId === evento.id)
        .reduce((acc, c) => acc + c.cantidad, 0);
    const entradasDisponibles =
        evento.capacidad - entradasVendidas;
    const estadoEvento =
        entradasDisponibles <= 0
            ? 'Agotado'
            : 'Disponible';
    const borrarEvento = () => {
        if (entradasVendidas > 0) {
            Alert.alert(
                'No se puede eliminar',
                `El evento tiene ${entradasVendidas} entradas vendidas.`
            );
            return;
        }

        Alert.alert(
            'Eliminar evento',
            '¿Está seguro que desea eliminar este evento?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        eliminarEvento(Number(id));
                        router.push('/administrador/eventos');
                    },
                },
            ]
        );
    };

    const sectoresHabilitados = Object.values(
        evento.sectores
    ).filter(
        sector => sector.capacidad > 0
    ).length;
    return (
        <View style={{ flex: 1 }}>

            {/* BOTÓN VOLVER */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>

            <View style={styles.container}>
                <Text style={styles.titulo}>Detalles del evento</Text>

                <Text style={styles.partido}>
                    {evento.paisLocal} vs {evento.paisVisitante}
                </Text>

                <Text style={styles.info}>
                    {evento.fecha} - {evento.hora}
                </Text>

                <Text style={styles.info}>
                    {evento.estadio}
                </Text>

                <View style={styles.componente}>
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                tabActiva === 'informacion' && styles.tabActiva,
                            ]}
                            onPress={() => setTabActiva('informacion')}
                        >
                            <Text
                                style={[
                                    styles.tabTexto,
                                    tabActiva === 'informacion' &&
                                    styles.tabTextoActivo,
                                ]}
                            >
                                Información
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.tab,
                                tabActiva === 'sectores' && styles.tabActiva,
                            ]}
                            onPress={() => setTabActiva('sectores')}
                        >
                            <Text
                                style={[
                                    styles.tabTexto,
                                    tabActiva === 'sectores' &&
                                    styles.tabTextoActivo,
                                ]}
                            >
                                Sectores
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {tabActiva === 'informacion' ? (
                        <>
                            <View style={styles.fila}>
                                <Text style={styles.label}>
                                    Capacidad total
                                </Text>

                                <Text style={styles.valor}>
                                    {capacidad}
                                </Text>
                            </View>
                            <View style={styles.fila}>
                                <Text style={styles.label}>
                                    Entradas vendidas
                                </Text>

                                <Text style={styles.valor}>
                                    {entradasVendidas}
                                </Text>
                            </View>

                            <View style={styles.fila}>
                                <Text style={styles.label}>
                                    Entradas disponibles
                                </Text>

                                <Text style={styles.valor}>
                                    {entradasDisponibles}
                                </Text>
                            </View>

                            <View style={styles.fila}>
                                <Text style={styles.label}>
                                    Sectores habilitados
                                </Text>

                                <Text style={styles.valor}>
                                    {sectoresHabilitados}
                                </Text>
                            </View>

                            <View style={styles.fila}>
                                <Text style={styles.label}>
                                    Estado
                                </Text>

                                <Text
                                    style={[
                                        styles.valor,
                                        {
                                            color:
                                                estadoEvento === 'Agotado'
                                                    ? '#C62828'
                                                    : '#16A34A',
                                        },
                                    ]}
                                >
                                    {estadoEvento}
                                </Text>
                            </View>
                        </>
                    ) : (
                        <>
                            {evento.sectores.A && (
                                <View style={styles.fila}>
                                    <Text style={styles.label}>
                                        Sector A
                                    </Text>

                                    <Text style={styles.valor}>
                                        {evento.sectores.A.capacidad} lugares - USD {evento.sectores.A.precio}
                                    </Text>
                                </View>
                            )}

                            {evento.sectores.B && (
                                <View style={styles.fila}>
                                    <Text style={styles.label}>
                                        Sector B
                                    </Text>

                                    <Text style={styles.valor}>
                                        {evento.sectores.B.capacidad} lugares - USD {evento.sectores.B.precio}
                                    </Text>
                                </View>
                            )}

                            {evento.sectores.C && (
                                <View style={styles.fila}>
                                    <Text style={styles.label}>
                                        Sector C
                                    </Text>

                                    <Text style={styles.valor}>
                                        {evento.sectores.C.capacidad} lugares - USD {evento.sectores.C.precio}
                                    </Text>
                                </View>
                            )}

                            {evento.sectores.D && (
                                <View style={styles.fila}>
                                    <Text style={styles.label}>
                                        Sector D
                                    </Text>

                                    <Text style={styles.valor}>
                                        {evento.sectores.D.capacidad} lugares - USD {evento.sectores.D.precio}
                                    </Text>
                                </View>
                            )}
                        </>
                    )}

                    <View style={styles.botonesContainer}>
                        <TouchableOpacity
                            style={styles.botonEditar}
                            onPress={() =>
                                router.push({
                                    pathname: '/administrador/editarEvento',
                                    params: {
                                        id: evento.id,
                                    },
                                })
                            }
                        >
                            <Text style={styles.textoBoton}>
                                Editar evento
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.botonEliminar,
                                entradasVendidas > 0 && {
                                    backgroundColor: '#999',
                                },
                            ]}
                            disabled={entradasVendidas > 0}
                            onPress={borrarEvento}
                        >
                            <Text style={styles.textoBoton}>
                                Eliminar evento
                            </Text>
                        </TouchableOpacity>
                        {entradasVendidas > 0 && (
                            <Text
                                style={{
                                    color: '#C62828',
                                    marginTop: 10,
                                    textAlign: 'center',
                                }}
                            >
                                No puede eliminarse porque ya tiene entradas vendidas.
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 50,
        left: 15,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },

    backText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: -2,
    },
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        paddingTop: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
    },

    titulo: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    },

    partido: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },

    info: {
        color: '#D9D9D9',
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },

    componente: {
        width: '100%',
        marginTop: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
    },

    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#EAEAEA',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
    },

    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },

    tabActiva: {
        backgroundColor: '#051F3B',
    },

    tabTexto: {
        color: '#555',
        fontWeight: '600',
    },

    tabTextoActivo: {
        color: '#FFFFFF',
    },

    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    label: {
        fontSize: 16,
        color: '#555',
    },

    valor: {
        fontSize: 16,
        fontWeight: '600',
        color: '#051F3B',
    },

    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },

    botonEditar: {
        flex: 1,
        backgroundColor: '#051F3B',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 8,
    },

    botonEliminar: {
        flex: 1,
        backgroundColor: '#C62828',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 8,
    },

    textoBoton: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});