import { useEstadios } from '@/context/EstadiosContext';
import { useEventos } from '@/context/EventosContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Estadios() {
    const { eventos } = useEventos();
    const { estadios, eliminarEstadio } = useEstadios();
    const router = useRouter();
    const [search, setSearch] = useState('');
    const borrarEstadio = (id: number) => {
        const estadio = estadios.find(
            e => e.id === id
        );

        const tieneEventos = eventos.some(
            evento => evento.estadio === estadio?.nombre
        );

        if (tieneEventos) {
            Alert.alert(
                'No se puede eliminar',
                'Este estadio tiene eventos asociados.'
            );
            return;
        }

        Alert.alert(
            'Eliminar estadio',
            '¿Está seguro que desea eliminar este estadio?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => eliminarEstadio(id),
                },
            ]
        );
    };
    const estadiosFiltrados = estadios.filter((estadio) =>
        estadio.nombre.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Estadios</Text>

                <TouchableOpacity style={styles.addButton}
                    onPress={() => router.push('/administrador/crearEstadio')}>
                    <Ionicons name="add" size={28} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Buscador */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#6B7280" />
                <TextInput
                    placeholder="Buscar estadio..."
                    placeholderTextColor="#6B7280"
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Lista */}
            {estadiosFiltrados.map((estadio) => {

                // 👇 ACA VA (este es el lugar correcto)
                const tieneEventosAsociados = eventos.some(
                    e => e.estadio === estadio.nombre
                );

                return (
                    <View key={estadio.id} style={styles.card}>
                        {/* IMAGEN A LA IZQUIERDA */}
                        <View style={styles.cardImageContainer}>
                            <Image
                                source={require('../../../../assets/images/estadio.png')}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                        </View>

                        {/* TEXTO A LA DERECHA */}
                        <View style={styles.cardContent}>
                            <Text style={styles.nombre}>
                                {estadio.nombre}
                            </Text>

                            <Text style={styles.info}>
                                {estadio.ciudad}
                            </Text>

                            <Text style={styles.info}>
                                {estadio.capacidad.toLocaleString()}
                            </Text>
                        </View>

                        {/* BOTÓN EDITAR */}
                        <View style={styles.botones}>
                            <TouchableOpacity
                                style={[
                                    styles.editButton,
                                    tieneEventosAsociados &&
                                    styles.buttonDisabled,
                                ]}
                                disabled={tieneEventosAsociados}
                                onPress={() =>
                                    router.push({
                                        pathname: '/administrador/editarEstadio',
                                        params: {
                                            id: estadio.id,
                                        },
                                    })
                                }
                            >
                                <Ionicons
                                    name="create-outline"
                                    size={22}
                                    color="#FFF"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.deleteButton,
                                    tieneEventosAsociados &&
                                    styles.buttonDisabled,
                                ]}
                                disabled={tieneEventosAsociados}
                                onPress={() =>
                                    borrarEstadio(estadio.id)
                                }
                            >
                                <Ionicons
                                    name="trash-outline"
                                    size={22}
                                    color="#FFF"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}
        </View>
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

    addButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#16A34A',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 140,
    },

    cardImageContainer: {
        width: 95,
        height: 95,
        borderRadius: 14,
        marginRight: 14,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    cardContent: {
        flex: 1,
    },

    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },

    info: {
        fontSize: 15,
        color: '#6B7280',
        marginBottom: 3,
    },

    editButton: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botones: {
        gap: 8,
    },

    deleteButton: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#DC2626',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#9CA3AF',
    },
});