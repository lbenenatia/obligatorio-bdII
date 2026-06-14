import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Eventos() {
    const [tabActiva, setTabActiva] = useState('informacion');

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Detalles del evento</Text>

            <Text style={styles.partido}>Uruguay vs Argentina</Text>

            <Text style={styles.info}>15 de junio de 2026</Text>

            <Text style={styles.info}>Estadio Centenario</Text>

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
                            <Text style={styles.valor}>60.000</Text>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.label}>
                                Entradas vendidas
                            </Text>
                            <Text style={styles.valor}>45.000</Text>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.label}>
                                Entradas disponibles
                            </Text>
                            <Text style={styles.valor}>15.000</Text>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.label}>
                                Sectores habilitados
                            </Text>
                            <Text style={styles.valor}>4</Text>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.label}>Estado</Text>
                            <Text style={styles.valor}>Activo</Text>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.fila}>
                            <Text style={styles.label}>
                                Tribuna Olímpica
                            </Text>
                            <Text style={styles.valor}>20.000</Text>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.label}>
                                Tribuna América
                            </Text>
                            <Text style={styles.valor}>15.000</Text>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.label}>
                                Tribuna Colombes
                            </Text>
                            <Text style={styles.valor}>12.500</Text>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.label}>
                                Tribuna Ámsterdam
                            </Text>
                            <Text style={styles.valor}>12.500</Text>
                        </View>
                    </>
                )}

                <View style={styles.botonesContainer}>
                    <TouchableOpacity style={styles.botonEditar}>
                        <Text style={styles.textoBoton}>
                            Editar evento
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botonEliminar}>
                        <Text style={styles.textoBoton}>
                            Eliminar evento
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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