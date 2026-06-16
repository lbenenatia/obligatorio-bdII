import { useEstadios } from '@/context/EstadiosContext';
import { useEventos } from '@/context/EventosContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function NuevoEvento() {
    const { agregarEvento } = useEventos();
    const router = useRouter();
    const [paisLocal, setPaisLocal] = useState('');
    const [paisVisitante, setPaisVisitante] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [estadio, setEstadio] = useState('');
    const [sectorA, setSectorA] = useState(false);
    const [sectorB, setSectorB] = useState(false);
    const [sectorC, setSectorC] = useState(false);
    const [sectorD, setSectorD] = useState(false);
    const { estadios } = useEstadios();
    const [mostrarEstadios, setMostrarEstadios] =
        useState(false);
    const estadioSeleccionado = estadios.find(
        e => e.nombre === estadio
    );
    const guardarEvento = () => {
        if (
            !paisLocal ||
            !paisVisitante ||
            !fecha ||
            !hora ||
            !estadio
        ) {
            return;
        }

        agregarEvento({
            id: Date.now(),
            paisLocal,
            paisVisitante,
            fecha,
            hora,
            estadio,
            capacidad: estadioSeleccionado?.capacidad ?? 0,
            sectores: {
                ...(sectorA && { A: estadioSeleccionado!.sectores.A }),
                ...(sectorB && { B: estadioSeleccionado!.sectores.B }),
                ...(sectorC && { C: estadioSeleccionado!.sectores.C }),
                ...(sectorD && { D: estadioSeleccionado!.sectores.D }),
            },
        });

        router.push('/administrador/eventos');
    };

    return (
        <View style={{ flex: 1 }}>

            {/* BOTÓN VOLVER */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Nuevo Evento</Text>

                <View style={styles.formulario}>
                    <Text style={styles.label}>País local</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Uruguay"
                        value={paisLocal}
                        onChangeText={setPaisLocal}
                    />

                    <Text style={styles.label}>País visitante</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Argentina"
                        value={paisVisitante}
                        onChangeText={setPaisVisitante}
                    />

                    <Text style={styles.label}>Fecha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="15/06/2026"
                        value={fecha}
                        onChangeText={setFecha}
                    />

                    <Text style={styles.label}>Hora</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="20:00"
                        value={hora}
                        onChangeText={setHora}
                    />


                    <Text style={styles.label}>Estadio</Text>

                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() =>
                            setMostrarEstadios(!mostrarEstadios)
                        }
                    >
                        <Text
                            style={
                                estadio
                                    ? styles.selectorText
                                    : styles.placeholderText
                            }
                        >
                            {estadio || 'Seleccione un estadio'}
                        </Text>
                    </TouchableOpacity>

                    {mostrarEstadios &&
                        estadios.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.opcionEstadio}
                                onPress={() => {
                                    setEstadio(item.nombre);
                                    setMostrarEstadios(false);
                                }}
                            >
                                <Text style={styles.opcionEstadioTexto}>
                                    {item.nombre}
                                </Text>
                            </TouchableOpacity>
                        ))}

                    {estadioSeleccionado && (
                        <View style={styles.capacidadBox}>
                            <Text style={styles.capacidadTexto}>
                                Capacidad máxima: {estadioSeleccionado.capacidad}
                            </Text>

                            <Text style={styles.capacidadTexto}>
                                Ciudad: {estadioSeleccionado.ciudad}
                            </Text>
                        </View>
                    )}

                    <Text style={styles.label}>Sectores habilitados</Text>

                    <View style={styles.checkboxContainer}>
                        <Text style={styles.checkboxText}>Sector A</Text>

                        <TouchableOpacity
                            onPress={() => setSectorA(!sectorA)}
                            style={[
                                styles.checkbox,
                                sectorA && styles.checkboxSeleccionado,
                            ]}
                        >
                            <Text style={styles.checkboxIcon}>
                                {sectorA ? '✓' : ''}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Text style={styles.checkboxText}>Sector B</Text>

                        <TouchableOpacity
                            onPress={() => setSectorB(!sectorB)}
                            style={[
                                styles.checkbox,
                                sectorB && styles.checkboxSeleccionado,
                            ]}
                        >
                            <Text style={styles.checkboxIcon}>
                                {sectorB ? '✓' : ''}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Text style={styles.checkboxText}>Sector C</Text>

                        <TouchableOpacity
                            onPress={() => setSectorC(!sectorC)}
                            style={[
                                styles.checkbox,
                                sectorC && styles.checkboxSeleccionado,
                            ]}
                        >
                            <Text style={styles.checkboxIcon}>
                                {sectorC ? '✓' : ''}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Text style={styles.checkboxText}>Sector D</Text>

                        <TouchableOpacity
                            onPress={() => setSectorD(!sectorD)}
                            style={[
                                styles.checkbox,
                                sectorD && styles.checkboxSeleccionado,
                            ]}
                        >
                            <Text style={styles.checkboxIcon}>
                                {sectorD ? '✓' : ''}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.boton}
                        onPress={guardarEvento}
                    >
                        <Text style={styles.textoBoton}>
                            Crear Evento
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        backgroundColor: '#051F3B',
        padding: 20,
        paddingTop: 60,
        paddingBottom: 40,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 30,
    },

    formulario: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#051F3B',
        marginBottom: 8,
        marginTop: 12,
    },

    input: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },

    boton: {
        backgroundColor: '#051F3B',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 25,
    },

    textoBoton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    checkboxText: {
        fontSize: 16,
        color: '#051F3B',
    },

    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#9D9D9D',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    checkboxSeleccionado: {
        backgroundColor: '#0F6ED4',
        borderColor: '#0F6ED4',
    },

    checkboxIcon: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },


    selector: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },

    selectorText: {
        fontSize: 16,
        color: '#051F3B',
    },

    placeholderText: {
        fontSize: 16,
        color: '#999',
    },

    opcionEstadio: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#D9D9D9',
        padding: 12,
        backgroundColor: '#FFF',
    },

    opcionEstadioTexto: {
        fontSize: 16,
        color: '#051F3B',
    },

    capacidadBox: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 12,
        marginTop: 5,
        marginBottom: 10,
    },

    capacidadTexto: {
        color: '#051F3B',
        fontSize: 15,
        fontWeight: '600',
    },
});