import { EstadioService } from '@/services/EstadioService';
import { EventoService } from '@/services/EventoService';
import { Estadio } from '@/types/estadio';
import { mostrarAlerta } from '@/utils/alert';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Screen from '../screen';

export default function NuevoEvento() {
    const router = useRouter();
    const [equipoLocalNombre, setEquipoLocalNombre] = useState('');
    const [equipoVisitanteNombre, setEquipoVisitanteNombre] = useState('');
    const [fechaEvento, setFechaEvento] = useState('');
    const [horaEvento, setHoraEvento] = useState('');
    const [estadios, setEstadios] = useState<Estadio[]>([]);
    const [estadioId, setEstadioId] = useState<number | null>(null);
    const [mostrarEstadios, setMostrarEstadios] = useState(false);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        EstadioService.listar().then(setEstadios).catch(() => { });
    }, []);

    const estadioSeleccionado = estadios.find(
        e => e.id === estadioId
    );

    const seleccionarEstadio = (estadio: Estadio) => {
        setEstadioId(estadio.id);
        setMostrarEstadios(false);
    };

    const guardarEvento = async () => {
        if (
            !equipoLocalNombre ||
            !equipoVisitanteNombre ||
            !fechaEvento ||
            !horaEvento ||
            !estadioId
        ) {
            return;
        }

        setGuardando(true);
        try {
            await EventoService.crear({
                estadioId,
                equipoLocalNombre,
                equipoVisitanteNombre,
                fechaEvento,
                horaEvento,
            });

            router.push('/administrador/eventos');
        } catch (error) {
            mostrarAlerta(
                'Error',
                error instanceof Error ? error.message : 'No se pudo crear el evento'
            );
        } finally {
            setGuardando(false);
        }
    };

    return (
        <Screen backgroundColor="#051F3B">
            <View style={styles.containerPrincipal}>

                {/* BOTÓN VOLVER */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.title}>Nuevo Evento</Text>

                    <View style={styles.formulario}>
                        <Text style={styles.label}>Equipo local</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej: Uruguay"
                            value={equipoLocalNombre}
                            onChangeText={setEquipoLocalNombre}
                        />

                        <Text style={styles.label}>Equipo visitante</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej: Argentina"
                            value={equipoVisitanteNombre}
                            onChangeText={setEquipoVisitanteNombre}
                        />

                        <Text style={styles.label}>Fecha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="2026-06-15"
                            value={fechaEvento}
                            onChangeText={setFechaEvento}
                        />

                        <Text style={styles.label}>Hora</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="20:00"
                            value={horaEvento}
                            onChangeText={setHoraEvento}
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
                                    estadioSeleccionado
                                        ? styles.selectorText
                                        : styles.placeholderText
                                }
                            >
                                {estadioSeleccionado?.nombreEstadio || 'Seleccione un estadio'}
                            </Text>
                        </TouchableOpacity>

                        {mostrarEstadios &&
                            estadios.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.opcionEstadio}
                                    onPress={() => seleccionarEstadio(item)}
                                >
                                    <Text style={styles.opcionEstadioTexto}>
                                        {item.nombreEstadio}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                        {estadioSeleccionado && (
                            <View style={styles.capacidadBox}>
                                <Text style={styles.capacidadTexto}>
                                    Ubicación: {estadioSeleccionado.ubicacion}
                                </Text>
                                {estadioSeleccionado.sectores.map(sector => (
                                    <Text key={sector.codigo} style={styles.capacidadTexto}>
                                        Sector {sector.codigo}: {sector.capMax} entradas - ${sector.precio}
                                    </Text>
                                ))}
                            </View>
                        )}

                        <TouchableOpacity
                            style={styles.boton}
                            onPress={guardarEvento}
                            disabled={guardando}
                        >
                            <Text style={styles.textoBoton}>
                                {guardando ? 'Creando...' : 'Crear Evento'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flexGrow: 1,
        minHeight: '100%',
        backgroundColor: '#051F3B',
    },
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
