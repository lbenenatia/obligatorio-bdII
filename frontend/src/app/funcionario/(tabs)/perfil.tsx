import { useAuth } from '@/context/AuthContext';
import { FuncionarioService } from '@/services/FuncionarioService';
import { obtenerNroVinculacion } from '@/utils/dispositivo';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../screen';

export default function Perfil() {
    const router = useRouter();
    const { usuario, logout } = useAuth();
    const [nroVinculacion, setNroVinculacion] = useState<string | null>(null);
    const [dispositivoAutorizado, setDispositivoAutorizado] = useState(false);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const idLocal = await obtenerNroVinculacion();
                setNroVinculacion(idLocal);

                try {
                    const miDispositivo = await FuncionarioService.miDispositivo();
                    setDispositivoAutorizado(
                        !!miDispositivo && miDispositivo.autorizado && miDispositivo.nroVinculacion === idLocal
                    );
                } catch {
                    setDispositivoAutorizado(false);
                }
            })();
        }, [])
    );

    if (!usuario) {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#FFF' }}>
                    No hay sesión iniciada
                </Text>
            </View>
        );
    }

    return (
        <Screen backgroundColor="#051F3B">
            <View style={styles.container}>

                {/* HEADER */}
                <FontAwesome name="user-circle" size={90} color="#FFFFFF" />

                <Text style={styles.nombre}>
                    {usuario.nombre}
                </Text>

                {/* CARD */}
                <View style={styles.centerContainer}>
                    <View style={styles.card}>

                        <Text style={styles.cardTitle}>
                            Perfil del funcionario
                        </Text>

                        {/* EMAIL */}
                        <View style={styles.block}>
                            <Text style={styles.label}>Correo electrónico</Text>
                            <Text style={styles.value}>{usuario.email}</Text>
                        </View>

                        {/* ROL */}
                        <View style={styles.block}>
                            <Text style={styles.label}>Rol</Text>
                            <Text style={styles.value}>{usuario.rol}</Text>
                        </View>

                        {/* TELÉFONOS */}
                        <View style={styles.block}>
                            <Text style={styles.label}>Teléfonos</Text>
                            <Text style={styles.value}>
                                {usuario.telefonos?.join(', ') || 'Sin teléfono'}
                            </Text>
                        </View>

                        {/* DOCUMENTO */}
                        <View style={styles.block}>
                            <Text style={styles.label}>Documento</Text>
                            <Text style={styles.value}>
                                {usuario.documentoTipo || 'Sin datos'} - {usuario.paisDocumento || ''}
                            </Text>
                            <Text style={styles.subvalue}>
                                {usuario.nroDocumento || ''}
                            </Text>
                        </View>

                        {/* DIRECCIÓN */}
                        <View style={styles.block}>
                            <Text style={styles.label}>Dirección</Text>
                            <Text style={styles.value}>{usuario.direccion?.paisDireccion}</Text>
                            <Text style={styles.subvalue}>{usuario.direccion?.localidad}</Text>
                            <Text style={styles.subvalue}>
                                {usuario.direccion?.calle} {usuario.direccion?.nroDireccion ?? ''}
                            </Text>
                            <Text style={styles.subvalue}>
                                CP: {usuario.direccion?.codigoPostal}
                            </Text>
                        </View>

                        {/* DISPOSITIVO */}
                        <View style={[styles.block, { borderBottomWidth: 0, marginBottom: 0 }]}>
                            <Text style={styles.label}>Dispositivo de escaneo</Text>
                            <Text style={styles.value}>
                                {dispositivoAutorizado ? '✅ Autorizado' : '⛔ No autorizado'}
                            </Text>
                            <Text style={styles.subvalue}>
                                Si no está autorizado, pasale este ID a un administrador:
                            </Text>
                            <Text style={styles.idDispositivo}>{nroVinculacion}</Text>
                        </View>

                    </View>

                    <TouchableOpacity
                        style={styles.botonCerrarSesion}
                        onPress={async () => {
                            await logout();
                            router.replace('/');
                        }}
                    >
                        <FontAwesome name="sign-out" size={18} color="#FFFFFF" />
                        <Text style={styles.textoCerrarSesion}>
                            Cerrar sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    );
} const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        alignItems: 'center',
        paddingTop: 80,
    },

    nombre: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },

    card: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 22,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 18,
        color: '#051F3B',
        textAlign: 'center',
    },

    block: {
        marginBottom: 18,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    label: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
    },

    value: {
        fontSize: 15,
        color: '#111827',
        fontWeight: '600',
    },

    subvalue: {
        fontSize: 14,
        color: '#374151',
        marginTop: 2,
    },

    idDispositivo: {
        fontSize: 14,
        fontWeight: '700',
        color: '#051F3B',
        backgroundColor: '#F3F4F6',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 6,
        alignSelf: 'flex-start',
    },

    botonCerrarSesion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DC2626',
        width: '90%',
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 20,
    },

    textoCerrarSesion: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});