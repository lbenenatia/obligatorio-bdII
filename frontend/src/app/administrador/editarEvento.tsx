import { EstadioService } from '@/services/EstadioService';
import { EventoService } from '@/services/EventoService';
import { Estadio } from '@/types/estadio';
import { mostrarAlerta } from '@/utils/alert';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

type ValoresSector = { capMax: string; precio: string };

export default function EditarEvento() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [equipoLocalNombre, setEquipoLocalNombre] = useState('');
    const [equipoVisitanteNombre, setEquipoVisitanteNombre] = useState('');
    const [fechaEvento, setFechaEvento] = useState('');
    const [horaEvento, setHoraEvento] = useState('');
    const [estadios, setEstadios] = useState<Estadio[]>([]);
    const [estadioId, setEstadioId] = useState<number | null>(null);
    const [mostrarEstadios, setMostrarEstadios] = useState(false);
    const [guardando, setGuardando] = useState(false);

    const [valoresSectores, setValoresSectores] = useState<Record<string, ValoresSector>>({});

    useEffect(() => {
        EstadioService.listar().then(setEstadios).catch(() => {});

        if (!id) return;
        EventoService.obtener(Number(id)).then(evento => {
            setEquipoLocalNombre(evento.equipoLocal.nombreEquipo);
            setEquipoVisitanteNombre(evento.equipoVisitante.nombreEquipo);
            setFechaEvento(evento.fechaEvento);
            setHoraEvento(evento.horaEvento);
            setEstadioId(evento.estadio.id);
        }).catch(() => {});
        EventoService.disponibilidad(Number(id)).then(sectores => {
            const valores: Record<string, ValoresSector> = {};
            for (const sector of sectores) {
                valores[sector.codigo] = {
                    capMax: String(sector.capMax),
                    precio: String(sector.precio),
                };
            }
            setValoresSectores(valores);
        }).catch(() => {});
    }, [id]);

    const estadioSeleccionado = estadios.find(
        e => e.id === estadioId
    );

    const seleccionarEstadio = (estadio: Estadio) => {
        setEstadioId(estadio.id);
        setMostrarEstadios(false);

        const valores: Record<string, ValoresSector> = {};
        for (const sector of estadio.sectores) {
            valores[sector.codigo] = {
                capMax: String(sector.capMax),
                precio: String(sector.precio),
            };
        }
        setValoresSectores(valores);
    };

    // La capacidad de un sector para el evento no puede superar la capacidad máxima
    // que tiene ese sector en el estadio (no tiene sentido vender más entradas de las que entran).
    const cambiarCapMax = (codigo: string, texto: string) => {
        const capMaxEstadio = estadioSeleccionado?.sectores.find(s => s.codigo === codigo)?.capMax ?? 0;
        const numero = Number(texto || 0);
        const valorFinal = texto !== '' && numero > capMaxEstadio
            ? String(capMaxEstadio)
            : texto;

        setValoresSectores(prev => ({
            ...prev,
            [codigo]: { ...prev[codigo], capMax: valorFinal },
        }));
    };

    const cambiarPrecio = (codigo: string, texto: string) => {
        setValoresSectores(prev => ({
            ...prev,
            [codigo]: { ...prev[codigo], precio: texto },
        }));
    };

    const guardarCambios = async () => {
        if (
            !id ||
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
            await EventoService.actualizar(Number(id), {
                estadioId,
                equipoLocalNombre,
                equipoVisitanteNombre,
                fechaEvento,
                horaEvento,
                sectores: Object.entries(valoresSectores).map(([codigo, v]) => ({
                    codigo: codigo as 'A' | 'B' | 'C' | 'D',
                    capMax: Number(v.capMax || 0),
                    precio: Number(v.precio || 0),
                })),
            });

            router.push('/administrador/eventos');
        } catch (error) {
            mostrarAlerta(
                'Error',
                error instanceof Error ? error.message : 'No se pudo actualizar el evento'
            );
        } finally {
            setGuardando(false);
        }
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
                <Text style={styles.title}>Editar Evento</Text>

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
                        <>
                            <View style={styles.capacidadBox}>
                                <Text style={styles.capacidadTexto}>
                                    Ubicación: {estadioSeleccionado.ubicacion}
                                </Text>
                            </View>

                            <Text style={styles.label}>
                                Capacidad y precio por sector (para este evento)
                            </Text>

                            {estadioSeleccionado.sectores.map(sector => (
                                <React.Fragment key={sector.codigo}>
                                    <Text style={styles.label}>
                                        Sector {sector.codigo} (máx. {sector.capMax})
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={`Capacidad Sector ${sector.codigo}`}
                                        keyboardType="numeric"
                                        value={valoresSectores[sector.codigo]?.capMax ?? ''}
                                        onChangeText={texto => cambiarCapMax(sector.codigo, texto)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder={`Precio Sector ${sector.codigo}`}
                                        keyboardType="numeric"
                                        value={valoresSectores[sector.codigo]?.precio ?? ''}
                                        onChangeText={texto => cambiarPrecio(sector.codigo, texto)}
                                    />
                                </React.Fragment>
                            ))}
                        </>
                    )}

                    <TouchableOpacity
                        style={styles.boton}
                        onPress={guardarCambios}
                        disabled={guardando}
                    >
                        <Text style={styles.textoBoton}>
                            {guardando ? 'Guardando...' : 'Guardar cambios'}
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
