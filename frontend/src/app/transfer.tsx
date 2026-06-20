import { useTransferencias } from '@/context/TransferenciasContext';
import { getUsuarioLogueado } from '@/data/sesion';
import { usuariosMock } from '@/data/usuarios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Image, ScrollView, StyleSheet, Text, TextInput,
    TouchableOpacity, View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function Transfer() {
    const router = useRouter();
    const usuario = getUsuarioLogueado();
    const { agregarTransferencia } = useTransferencias();

    const params = useLocalSearchParams();

    const compraId = Array.isArray(params.id) ? params.id[0] : params.id;
    const match = Array.isArray(params.match) ? params.match[0] : params.match;
    const date = Array.isArray(params.date) ? params.date[0] : params.date;
    const time = Array.isArray(params.time) ? params.time[0] : params.time;
    const estadio = Array.isArray(params.estadio) ? params.estadio[0] : params.estadio;
    const sector = Array.isArray(params.sector) ? params.sector[0] : params.sector;
    const cantidad = Array.isArray(params.cantidad) ? params.cantidad[0] : params.cantidad;

    const [seconds, setSeconds] = useState(30);
    const [qrValue, setQrValue] = useState(`ticket-${Date.now()}`);
    const [query, setQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const generarNuevoQR = () => {
        setQrValue(`ticket-${Date.now()}`);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    generarNuevoQR();
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const resultados = usuariosMock.filter(
        u =>
            u.email.toLowerCase().includes(query.toLowerCase()) &&
            u.id !== usuario?.id
    );

    const confirmarTransferencia = () => {
        if (!selectedUser || !usuario || !compraId) return;

        agregarTransferencia({
            id: Date.now().toString(),
            compraId: String(compraId),
            deUsuarioId: Number(usuario.id),
            deUsuarioNombre: usuario.nombre, // 👈 TE FALTABA ESTO
            aUsuarioId: Number(selectedUser.id),
            estado: 'PENDIENTE',
        });

        router.push('/transferenciaAprobada');
    };

    if (!compraId) {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#fff' }}>
                    No se encontró la compra
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>
            <Image
                source={require('../../assets/images/logo_blanco.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.mainCard}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.cardLogo}
                    resizeMode="contain"
                />

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                        {match}
                    </Text>

                    <Text style={styles.subtitle}>
                        {date} - {time} • Sector {sector}, Entradas: {cantidad}
                    </Text>

                    <View style={styles.divider} />

                    <View style={styles.qrContainer}>
                        <QRCode
                            value={qrValue}
                            size={99}
                        />
                    </View>

                    <View style={styles.timerContainer}>
                        <Text style={styles.refreshIcon}>↻</Text>

                        <Text style={styles.timerText}>
                            El código QR se actualiza en:{' '}
                            <Text style={styles.timerBold}>
                                00:{seconds < 10 ? `0${seconds}` : seconds}
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <ScrollView
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: 30,
                    }}
                >
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.mainTitle}>
                            Transferir entrada
                        </Text>

                        <Text style={styles.subtitle2}>
                            México vs Sudáfrica, Sector A, Asiento 15
                        </Text>

                        <Text style={styles.description}>
                            Buscar un usuario por email
                        </Text>
                    </View>

                    <View style={styles.searchContainer}>
                        <Text style={styles.searchIcon}>⌕</Text>

                        <TextInput
                            placeholder="ejemplo@correo.com"
                            placeholderTextColor="#999"
                            style={styles.searchInput}
                            value={query}
                            editable={!selectedUser}
                            onChangeText={(text) => {
                                setQuery(text);
                                setShowDropdown(true);
                            }}
                        />
                    </View>

                    {showDropdown && query.length > 0 && !selectedUser && (
                        <View style={styles.dropdown}>
                            {resultados.length === 0 ? (
                                <Text style={styles.noResults}>No se encontraron usuarios</Text>
                            ) : (
                                resultados.map(user => (
                                    <TouchableOpacity
                                        key={user.id}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedUser(user);
                                            setQuery('');
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>
                                            {user.nombre} ({user.email})
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            )}
                        </View>
                    )}
                    {selectedUser && (
                        <View style={styles.selectedBox}>
                            <Text style={styles.selectedText}>
                                Usuario seleccionado:
                            </Text>

                            <Text style={styles.selectedName}>
                                {selectedUser.nombre}
                            </Text>

                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedUser(null);
                                    setQuery('');
                                    setShowDropdown(false);
                                }}
                            >
                                <Text style={styles.remove}>✕ Cambiar usuario</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={styles.footerButtons}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={confirmarTransferencia}
                        >
                            <Text style={styles.primaryButtonText}>
                                Confirmar transferencia
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryButton}
                            onPress={() => router.push('/home')}>
                            <Text style={styles.secondaryButtonText}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 55,
        left: 18,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },

    backText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: -2,
    },

    logo: {
        width: '50%',
        height: 100,
        marginTop: 80,
    },

    mainCard: {
        width: '90%',
        height: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        marginTop: 10,
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },

    cardLogo: {
        width: 166,
        height: 57,
        position: 'absolute',
        top: 15,
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 80,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 25,
    },

    divider: {
        width: '120%',
        height: 1,
        backgroundColor: '#BDBDBD',
        marginBottom: 12,
    },
    qrContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },

    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    refreshIcon: {
        fontSize: 26,
        color: '#000',
        marginRight: 10,
    },

    timerText: {
        fontSize: 16,
        color: '#000',
    },

    timerBold: {
        fontWeight: 'bold',
    },
    bottomContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: '#FFFFFF',

        marginTop: -25,

        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',

        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 10,
    },
    headerTextContainer: {
        width: '85%',
        alignSelf: 'center',
    },

    mainTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        marginBottom: 6,
    },

    subtitle2: {
        fontSize: 17,
        color: '#000',
        textAlign: 'left',
        marginBottom: 16,
    },

    description: {
        fontSize: 16,
        color: '#000',
        textAlign: 'left',
    },

    searchContainer: {
        width: '90%',
        height: 38,
        borderWidth: 1,
        borderColor: '#C5C5C5',
        borderRadius: 30,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
    },

    searchIcon: {
        fontSize: 24,
        color: '#999',
        marginRight: 10,
    },

    searchInput: {
        flex: 1,
        fontSize: 18,
        color: '#000',
    },

    footerButtons: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20,
    },
    primaryButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#1958D0',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },

    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },

    secondaryButton: {
        width: '90%',
        height: 50,
        borderWidth: 1.5,
        borderColor: '#1958D0',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        backgroundColor: 'transparent',
    },
    secondaryButtonText: {
        color: '#1958D0',
        fontSize: 18,
        fontWeight: '600',
    },
    dropdown: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        maxHeight: 180,
    },

    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    dropdownText: {
        fontSize: 16,
        color: '#000',
    },

    noResults: {
        padding: 12,
        color: '#888',
    },

    selectedBox: {
        width: '90%',
        backgroundColor: '#D9D9D9',
        borderRadius: 16,
        padding: 12,
        marginTop: 20,
    },

    selectedText: {
        fontSize: 14,
        color: '#000',
    },

    selectedName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },

    remove: {
        marginTop: 8,
        color: '#1958D0',
        fontWeight: '600',
    },
});