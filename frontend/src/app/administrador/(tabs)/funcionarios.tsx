import { FuncionarioService } from '@/services/FuncionarioService';
import { FuncionarioResumen } from '@/types/funcionario';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../screen';

export default function Funcionarios() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [funcionarios, setFuncionarios] = useState<FuncionarioResumen[]>([]);

    useFocusEffect(
        useCallback(() => {
            FuncionarioService.listar().then(setFuncionarios).catch(() => { });
        }, [])
    );

    const funcionariosFiltrados = funcionarios.filter((f) =>
        `${f.nombre} ${f.apellido} ${f.email} ${f.legajo}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <Screen backgroundColor="#051F3B">
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Funcionarios</Text>
                </View>

                {/* Buscador */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#6B7280" />
                    <TextInput
                        placeholder="Buscar funcionario..."
                        placeholderTextColor="#6B7280"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Lista */}
                {funcionariosFiltrados.map((funcionario) => (
                    <View key={funcionario.id} style={styles.card}>
                        <Text style={styles.nombre}>
                            {funcionario.nombre} {funcionario.apellido}
                        </Text>

                        <Text style={styles.info}>{funcionario.email}</Text>
                        <Text style={styles.info}>Legajo: {funcionario.legajo}</Text>

                        <View
                            style={[
                                styles.badge,
                                funcionario.dispositivoAutorizado
                                    ? styles.badgeOk
                                    : styles.badgePendiente,
                            ]}
                        >
                            <Text style={styles.badgeText}>
                                {funcionario.dispositivoAutorizado
                                    ? `Vinculado: ${funcionario.nroVinculacion}`
                                    : funcionario.nroVinculacion
                                        ? 'Revocado'
                                        : 'Sin vincular'}
                            </Text>
                        </View>

                        <View style={styles.accionesContainer}>
                            <TouchableOpacity
                                style={styles.accionBoton}
                                onPress={() =>
                                    router.push({
                                        pathname: '/administrador/asignarSectores',
                                        params: { funcionarioId: funcionario.id },
                                    })
                                }
                            >
                                <Ionicons name="grid-outline" size={16} color="#1958D0" />
                                <Text style={styles.accionTexto}>Sectores</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.accionBoton}
                                onPress={() =>
                                    router.push({
                                        pathname: '/administrador/asignarDispositivo',
                                        params: { funcionarioId: funcionario.id },
                                    })
                                }
                            >
                                <Ionicons name="phone-portrait-outline" size={16} color="#1958D0" />
                                <Text style={styles.accionTexto}>Dispositivo</Text>
                            </TouchableOpacity>
                        </View>
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

    accionesContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 12,
    },

    accionBoton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1958D0',
    },

    accionTexto: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1958D0',
    },
});
