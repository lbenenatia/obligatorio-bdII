import { EstadioService } from '@/services/EstadioService';
import { mostrarAlerta } from '@/utils/alert';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function EditarEstadio() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [nombreEstadio, setNombreEstadio] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [capMaxA, setCapMaxA] = useState('');
    const [precioA, setPrecioA] = useState('');

    const [capMaxB, setCapMaxB] = useState('');
    const [precioB, setPrecioB] = useState('');

    const [capMaxC, setCapMaxC] = useState('');
    const [precioC, setPrecioC] = useState('');

    const [capMaxD, setCapMaxD] = useState('');
    const [precioD, setPrecioD] = useState('');

    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (!id) return;

        EstadioService.obtener(Number(id)).then(estadio => {
            setNombreEstadio(estadio.nombreEstadio);
            setUbicacion(estadio.ubicacion);

            const porCodigo = (codigo: string) =>
                estadio.sectores.find(s => s.codigo === codigo);

            setCapMaxA(String(porCodigo('A')?.capMax ?? ''));
            setPrecioA(String(porCodigo('A')?.precio ?? ''));
            setCapMaxB(String(porCodigo('B')?.capMax ?? ''));
            setPrecioB(String(porCodigo('B')?.precio ?? ''));
            setCapMaxC(String(porCodigo('C')?.capMax ?? ''));
            setPrecioC(String(porCodigo('C')?.precio ?? ''));
            setCapMaxD(String(porCodigo('D')?.capMax ?? ''));
            setPrecioD(String(porCodigo('D')?.precio ?? ''));
        }).catch(() => {});
    }, [id]);

    const guardarEstadio = async () => {
        if (!id || !nombreEstadio || !ubicacion) return;

        setGuardando(true);
        try {
            await EstadioService.actualizar(Number(id), {
                nombreEstadio,
                ubicacion,
                sectores: [
                    { codigo: 'A', capMax: Number(capMaxA || 0), precio: Number(precioA || 0) },
                    { codigo: 'B', capMax: Number(capMaxB || 0), precio: Number(precioB || 0) },
                    { codigo: 'C', capMax: Number(capMaxC || 0), precio: Number(precioC || 0) },
                    { codigo: 'D', capMax: Number(capMaxD || 0), precio: Number(precioD || 0) },
                ],
            });

            router.push('/administrador/estadios');
        } catch (error) {
            mostrarAlerta(
                'Error',
                error instanceof Error ? error.message : 'No se pudo actualizar el estadio'
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

            <ScrollView style={styles.container}>
                <View style={styles.iconContainer}>
                    <Ionicons name="football-outline" size={45} color="#FFF" />
                </View>

                <Text style={styles.title}>Editar Estadio</Text>

                <View style={styles.formContainer}>
                    {/* NOMBRE */}
                    <Text style={styles.label}>Nombre del estadio</Text>
                    <TextInput
                        value={nombreEstadio}
                        onChangeText={setNombreEstadio}
                        placeholder="Ej. Estadio Nacional"
                        placeholderTextColor="#6B7280"
                        style={styles.input}
                    />

                    {/* UBICACIÓN */}
                    <Text style={styles.label}>Ubicación</Text>
                    <TextInput
                        value={ubicacion}
                        onChangeText={setUbicacion}
                        placeholder="Ej. Ciudad de México, México"
                        placeholderTextColor="#6B7280"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Sector A</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Capacidad Sector A"
                        keyboardType="numeric"
                        value={capMaxA}
                        onChangeText={setCapMaxA}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Precio Sector A"
                        keyboardType="numeric"
                        value={precioA}
                        onChangeText={setPrecioA}
                    />

                    <Text style={styles.label}>Sector B</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Capacidad Sector B"
                        keyboardType="numeric"
                        value={capMaxB}
                        onChangeText={setCapMaxB}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Precio Sector B"
                        keyboardType="numeric"
                        value={precioB}
                        onChangeText={setPrecioB}
                    />

                    <Text style={styles.label}>Sector C</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Capacidad Sector C"
                        keyboardType="numeric"
                        value={capMaxC}
                        onChangeText={setCapMaxC}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Precio Sector C"
                        keyboardType="numeric"
                        value={precioC}
                        onChangeText={setPrecioC}
                    />

                    <Text style={styles.label}>Sector D</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Capacidad Sector D"
                        keyboardType="numeric"
                        value={capMaxD}
                        onChangeText={setCapMaxD}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Precio Sector D"
                        keyboardType="numeric"
                        value={precioD}
                        onChangeText={setPrecioD}
                    />

                    {/* BOTÓN GUARDAR */}
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={guardarEstadio}
                        disabled={guardando}
                    >
                        <Text style={styles.saveButtonText}>
                            {guardando ? 'Guardando...' : 'Guardar estadio'}
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
});
