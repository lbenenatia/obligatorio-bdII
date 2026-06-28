import { FuncionarioService } from '@/services/FuncionarioService';
import { FuncionarioResumen } from '@/types/funcionario';
import { confirmar, mostrarAlerta } from '@/utils/alert';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Screen from '../screen';

export default function AsignarDispositivo() {
    const router = useRouter();
    const { funcionarioId } = useLocalSearchParams<{ funcionarioId: string }>();

    const [funcionario, setFuncionario] = useState<FuncionarioResumen | null>(null);
    const [nroVinculacion, setNroVinculacion] = useState('');
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (!funcionarioId) return;

        FuncionarioService.listar().then(lista => {
            const encontrado = lista.find(f => f.id === Number(funcionarioId)) ?? null;
            setFuncionario(encontrado);
            setNroVinculacion(encontrado?.nroVinculacion ?? '');
        }).catch(() => { });
    }, [funcionarioId]);

    const vincular = async () => {
        if (!funcionarioId || !nroVinculacion.trim()) return;

        setGuardando(true);
        try {
            await FuncionarioService.autorizarDispositivo(Number(funcionarioId), nroVinculacion.trim());
            mostrarAlerta('Listo', 'Dispositivo vinculado correctamente', () => router.back());
        } catch (error) {
            mostrarAlerta(
                'Error',
                error instanceof Error ? error.message : 'No se pudo vincular el dispositivo'
            );
        } finally {
            setGuardando(false);
        }
    };

    const revocar = async () => {
        if (!funcionarioId) return;

        const ok = await confirmar(
            'Revocar dispositivo',
            '¿Está seguro que desea revocar el dispositivo vinculado a este funcionario?'
        );
        if (!ok) return;

        setGuardando(true);
        try {
            await FuncionarioService.revocarDispositivo(Number(funcionarioId));
            mostrarAlerta('Listo', 'Dispositivo revocado', () => router.back());
        } catch (error) {
            mostrarAlerta(
                'Error',
                error instanceof Error ? error.message : 'No se pudo revocar el dispositivo'
            );
        } finally {
            setGuardando(false);
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
                        <Ionicons name="phone-portrait-outline" size={45} color="#FFF" />
                    </View>

                    <Text style={styles.title}>Vincular dispositivo</Text>

                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Funcionario</Text>
                        <Text style={styles.nombreFuncionario}>
                            {funcionario ? `${funcionario.nombre} ${funcionario.apellido}` : '...'}
                        </Text>
                        <Text style={styles.subinfo}>{funcionario?.email}</Text>

                        <Text style={[styles.label, { marginTop: 18 }]}>ID de dispositivo</Text>
                        <TextInput
                            value={nroVinculacion}
                            onChangeText={setNroVinculacion}
                            placeholder="Pegá el ID que te pasó el funcionario"
                            placeholderTextColor="#6B7280"
                            autoCapitalize="none"
                            style={styles.input}
                        />

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={vincular}
                            disabled={guardando}
                        >
                            <Text style={styles.saveButtonText}>
                                {guardando ? 'Guardando...' : 'Vincular'}
                            </Text>
                        </TouchableOpacity>

                        {funcionario?.dispositivoAutorizado && (
                            <TouchableOpacity
                                style={styles.revokeButton}
                                onPress={revocar}
                                disabled={guardando}
                            >
                                <Text style={styles.revokeButtonText}>
                                    Revocar dispositivo vinculado
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
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
        marginBottom: 30,
    },

    formContainer: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 25,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,

        elevation: 8,
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        marginLeft: 2,
    },

    nombreFuncionario: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },

    subinfo: {
        fontSize: 14,
        color: '#6B7280',
    },

    input: {
        height: 55,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 18,
        backgroundColor: '#F9FAFB',
        color: '#111827',
    },

    saveButton: {
        backgroundColor: '#1958D0',
        height: 58,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    saveButtonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold',
    },

    revokeButton: {
        height: 50,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#DC2626',
    },

    revokeButtonText: {
        color: '#DC2626',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
