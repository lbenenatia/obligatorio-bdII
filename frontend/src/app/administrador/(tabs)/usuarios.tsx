import { UsuarioService } from '@/services/UsuarioService';
import { UsuarioGeneralResumen } from '@/types/usuario';
import { mostrarAlerta } from '@/utils/alert';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../screen';

export default function Usuarios() {
    const [search, setSearch] = useState('');
    const [usuarios, setUsuarios] = useState<UsuarioGeneralResumen[]>([]);
    const [actualizando, setActualizando] = useState<number | null>(null);

    const cargar = useCallback(() => {
        UsuarioService.listarGenerales().then(setUsuarios).catch(() => { });
    }, []);

    useFocusEffect(
        useCallback(() => {
            cargar();
        }, [cargar])
    );

    const usuariosFiltrados = usuarios.filter((u) =>
        `${u.nombre} ${u.apellido} ${u.email} ${u.nroDocumento}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const toggleVerificacion = async (usuario: UsuarioGeneralResumen) => {
        setActualizando(usuario.id);
        try {
            await UsuarioService.actualizarVerificacion(usuario.id, !usuario.verificacion);
            setUsuarios(prev =>
                prev.map(u => u.id === usuario.id ? { ...u, verificacion: !u.verificacion } : u)
            );
        } catch (error) {
            mostrarAlerta(
                'Error',
                error instanceof Error ? error.message : 'No se pudo actualizar la verificación'
            );
        } finally {
            setActualizando(null);
        }
    };

    return (
        <Screen backgroundColor="#051F3B">
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Usuarios</Text>
                </View>

                {/* Buscador */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#6B7280" />
                    <TextInput
                        placeholder="Buscar usuario..."
                        placeholderTextColor="#6B7280"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Lista */}
                {usuariosFiltrados.map((usuario) => (
                    <View key={usuario.id} style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.nombre}>
                                {usuario.nombre} {usuario.apellido}
                            </Text>

                            <Text style={styles.info}>{usuario.email}</Text>
                            <Text style={styles.info}>Documento: {usuario.nroDocumento}</Text>

                            <View
                                style={[
                                    styles.badge,
                                    usuario.verificacion ? styles.badgeOk : styles.badgePendiente,
                                ]}
                            >
                                <Text style={styles.badgeText}>
                                    {usuario.verificacion ? 'Verificada' : 'No verificada'}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.toggleBoton,
                                usuario.verificacion ? styles.toggleBotonRevocar : styles.toggleBotonVerificar,
                            ]}
                            onPress={() => toggleVerificacion(usuario)}
                            disabled={actualizando === usuario.id}
                        >
                            <Ionicons
                                name={usuario.verificacion ? 'close-circle-outline' : 'checkmark-circle-outline'}
                                size={16}
                                color={usuario.verificacion ? '#DC2626' : '#16A34A'}
                            />
                            <Text
                                style={[
                                    styles.toggleTexto,
                                    { color: usuario.verificacion ? '#DC2626' : '#16A34A' },
                                ]}
                            >
                                {actualizando === usuario.id
                                    ? '...'
                                    : usuario.verificacion ? 'Quitar verificación' : 'Verificar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        padding: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
    },

    searchContainer: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    searchInput: {
        flex: 1,
        padding: 14,
        fontSize: 16,
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },

    cardContent: {
        marginBottom: 12,
    },

    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },

    info: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 2,
    },

    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 8,
    },

    badgeOk: {
        backgroundColor: '#DCFCE7',
    },

    badgePendiente: {
        backgroundColor: '#FEE2E2',
    },

    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#111827',
    },

    toggleBoton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
    },

    toggleBotonVerificar: {
        borderColor: '#16A34A',
    },

    toggleBotonRevocar: {
        borderColor: '#DC2626',
    },

    toggleTexto: {
        fontSize: 13,
        fontWeight: '600',
    },
});
