import { EstadioService } from '@/services/EstadioService';
import { FuncionarioService } from '@/services/FuncionarioService';
import { Estadio } from '@/types/estadio';
import { FuncionarioResumen, SectorAsignado } from '@/types/funcionario';
import { mostrarAlerta } from '@/utils/alert';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Screen from '../screen';

export default function AsignarSectores() {
    const router = useRouter();
    const { funcionarioId } = useLocalSearchParams<{ funcionarioId: string }>();

    const [funcionario, setFuncionario] = useState<FuncionarioResumen | null>(null);
    const [estadios, setEstadios] = useState<Estadio[]>([]);
    const [asignados, setAsignados] = useState<SectorAsignado[]>([]);
    const [cargando, setCargando] = useState(true);
    const [actualizando, setActualizando] = useState<number | null>(null);

    useFocusEffect(
        useCallback(() => {
            if (!funcionarioId) return;
            let activo = true;

            (async () => {
                setCargando(true);
                try {
                    const [lista, estadiosData, sectoresAsignados] = await Promise.all([
                        FuncionarioService.listar(),
                        EstadioService.listar(),
                        FuncionarioService.sectoresDe(Number(funcionarioId)),
                    ]);
                    if (!activo) return;
                    setFuncionario(lista.find(f => f.id === Number(funcionarioId)) ?? null);
                    setEstadios(estadiosData);
                    setAsignados(sectoresAsignados);
                } catch {
                    // se deja la pantalla vacía; el usuario puede volver e intentar de nuevo
                } finally {
                    if (activo) setCargando(false);
                }
            })();

            return () => {
                activo = false;
            };
        }, [funcionarioId])
    );

    const estaAsignado = (sectorId: number) => asignados.some(s => s.id === sectorId);

    const toggleSector = async (sectorId: number) => {
        if (!funcionarioId || actualizando !== null) return;

        const asignadoActualmente = estaAsignado(sectorId);
        setActualizando(sectorId);
        try {
            if (asignadoActualmente) {
                await FuncionarioService.quitarSector(Number(funcionarioId), sectorId);
                setAsignados(prev => prev.filter(s => s.id !== sectorId));
            } else {
                await FuncionarioService.asignarSector(Number(funcionarioId), sectorId);
                const actualizados = await FuncionarioService.sectoresDe(Number(funcionarioId));
                setAsignados(actualizados);
            }
        } catch (error) {
            mostrarAlerta(
                'Error',
                error instanceof Error ? error.message : 'No se pudo actualizar la asignación'
            );
        } finally {
            setActualizando(null);
        }
    };

    return (
        <Screen backgroundColor="#051F3B">
            <View style={{ flex: 1 }}>

                {/* BOTÓN VOLVER */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>

                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="grid-outline" size={45} color="#FFF" />
                    </View>

                    <Text style={styles.title}>Asignar sectores</Text>

                    <View style={styles.headerInfo}>
                        <Text style={styles.nombreFuncionario}>
                            {funcionario ? `${funcionario.nombre} ${funcionario.apellido}` : '...'}
                        </Text>
                        <Text style={styles.subinfo}>{funcionario?.email}</Text>
                    </View>

                    {cargando ? (
                        <ActivityIndicator color="#FFFFFF" style={{ marginTop: 30 }} />
                    ) : estadios.length === 0 ? (
                        <Text style={styles.vacioTexto}>No hay estadios creados todavía.</Text>
                    ) : (
                        estadios.map(estadio => (
                            <View key={estadio.id} style={styles.estadioCard}>
                                <Text style={styles.estadioNombre}>{estadio.nombreEstadio}</Text>
                                <Text style={styles.estadioUbicacion}>{estadio.ubicacion}</Text>

                                <View style={styles.sectoresContainer}>
                                    {estadio.sectores.map(sector => {
                                        if (!sector.id) return null;
                                        const asignado = estaAsignado(sector.id);
                                        const cargandoEste = actualizando === sector.id;

                                        return (
                                            <TouchableOpacity
                                                key={sector.id}
                                                style={[
                                                    styles.sectorChip,
                                                    asignado && styles.sectorChipActivo,
                                                ]}
                                                onPress={() => toggleSector(sector.id!)}
                                                disabled={cargandoEste}
                                            >
                                                {cargandoEste ? (
                                                    <ActivityIndicator
                                                        size="small"
                                                        color={asignado ? '#FFFFFF' : '#051F3B'}
                                                    />
                                                ) : (
                                                    <>
                                                        <Ionicons
                                                            name={asignado ? 'checkmark-circle' : 'ellipse-outline'}
                                                            size={18}
                                                            color={asignado ? '#FFFFFF' : '#6B7280'}
                                                        />
                                                        <Text
                                                            style={[
                                                                styles.sectorChipTexto,
                                                                asignado && styles.sectorChipTextoActivo,
                                                            ]}
                                                        >
                                                            Sector {sector.codigo}
                                                        </Text>
                                                    </>
                                                )}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </View>
        </Screen>
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
        padding: 20,
        paddingTop: 60,
    },
    iconContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#0A2F57',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 15,
    },

    title: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },

    headerInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },

    nombreFuncionario: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    subinfo: {
        fontSize: 14,
        color: '#D1D5DB',
    },

    vacioTexto: {
        color: '#D1D5DB',
        textAlign: 'center',
        marginTop: 30,
        fontSize: 15,
    },

    estadioCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 18,
        marginBottom: 14,
    },

    estadioNombre: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#051F3B',
    },

    estadioUbicacion: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 12,
    },

    sectoresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },

    sectorChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: '#F9FAFB',
    },

    sectorChipActivo: {
        backgroundColor: '#1958D0',
        borderColor: '#1958D0',
    },

    sectorChipTexto: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },

    sectorChipTextoActivo: {
        color: '#FFFFFF',
    },
});
