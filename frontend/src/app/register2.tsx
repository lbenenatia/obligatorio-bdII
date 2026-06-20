import {
    Alert,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { AuthService } from '@/services/AuthService';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function RegisterScreen() {
    const router = useRouter();

    const { nombre, email, password } =
        useLocalSearchParams<{
            nombre: string;
            email: string;
            password: string;
        }>();

    const paises = [
        'Uruguay',
        'Argentina',
        'Brasil',
        'Chile',
        'Paraguay',
        'Bolivia',
        'Perú',
        'Colombia',
        'Ecuador',
        'Venezuela',
        'México',
        'Estados Unidos',
        'Canadá',
        'España',
    ];

    const tiposDocumento = [
        'Cédula de identidad',
        'Pasaporte',
        'DNI',
        'Licencia de conducir',
    ];

    const [modalPaisDocVisible, setModalPaisDocVisible] = useState(false);
    const [modalTipoDocVisible, setModalTipoDocVisible] = useState(false);
    const [modalPaisDirVisible, setModalPaisDirVisible] = useState(false);

    const [paisDocumento, setPaisDocumento] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');

    const [pais, setPais] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [calle, setCalle] = useState('');
    const [numeroPuerta, setNumeroPuerta] = useState('');
    const [cp, setCp] = useState('');

    const [telefonos, setTelefonos] = useState(['']);

    const agregarTelefono = () => {
        setTelefonos(prev => [...prev, '']);
    };

    const cambiarTelefono = (index: number, valor: string) => {
        const nuevos = [...telefonos];
        nuevos[index] = valor;
        setTelefonos(nuevos);
    };

    const crearCuenta = async () => {
        try {
            if (
                !paisDocumento ||
                !tipoDocumento ||
                !numeroDocumento ||
                !pais ||
                !localidad ||
                !calle ||
                !numeroPuerta ||
                !cp ||
                telefonos.some(t => !t.trim())
            ) {
                Alert.alert('Campos incompletos', 'Debes completar todos los campos');
                return;
            }
            if (!/^\d+$/.test(numeroDocumento)) {
                Alert.alert(
                    'Documento inválido',
                    'El número de documento solo puede contener números.'
                );
                return;
            }
            if (!/^\d+$/.test(numeroPuerta)) {
                Alert.alert(
                    'Número de puerta inválido',
                    'Debe ingresar solo números.'
                );
                return;
            }
            if (!/^\d+$/.test(cp)) {
                Alert.alert(
                    'Código postal inválido',
                    'El código postal debe contener solo números.'
                );
                return;
            }
            const telefonoInvalido = telefonos.some(
                t => !/^\d{8,15}$/.test(t)
            );

            if (telefonoInvalido) {
                Alert.alert(
                    'Teléfono inválido',
                    'Los teléfonos deben contener entre 8 y 15 dígitos.'
                );
                return;
            }
            if (!localidad.trim() || !calle.trim()) {
                Alert.alert(
                    'Datos inválidos',
                    'La localidad y la calle no pueden estar vacías.'
                );
                return;
            }
            await AuthService.register({
                id: Date.now(),
                nombre,
                email,
                password,
                rol: 'USUARIO',

                paisDocumento,
                tipoDocumento,
                numeroDocumento,

                pais,
                localidad,
                calle,
                numeroPuerta,
                cp,

                telefonos,
            });

            Alert.alert('Éxito', 'Cuenta creada correctamente', [
                {
                    text: 'Aceptar',
                    onPress: () => router.replace('/login'),
                },
            ]);
        } catch (error) {
            Alert.alert(
                'Error',
                error instanceof Error ? error.message : 'Ocurrió un error'
            );
        }
    };

    const Selector = ({
        value,
        placeholder,
        onPress,
    }: {
        value: string;
        placeholder: string;
        onPress: () => void;
    }) => (
        <TouchableOpacity style={styles.selector} onPress={onPress}>
            <Text style={value ? styles.selectorText : styles.placeholderText}>
                {value || placeholder}
            </Text>
            <Text>▼</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.subtitle}>Paso 2 de 2</Text>

            <View style={styles.formContainer}>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Documento</Text>

                    <Selector
                        value={paisDocumento}
                        placeholder="Seleccione país del documento"
                        onPress={() => setModalPaisDocVisible(true)}
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Selector
                                value={tipoDocumento}
                                placeholder="Tipo de documento"
                                onPress={() => setModalTipoDocVisible(true)}
                            />
                        </View>

                        <View style={styles.halfInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Número"
                                value={numeroDocumento}
                                keyboardType="numeric"
                                onChangeText={setNumeroDocumento}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dirección</Text>

                    <Selector
                        value={pais}
                        placeholder="País"
                        onPress={() => setModalPaisDirVisible(true)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Localidad"
                        value={localidad}
                        onChangeText={setLocalidad}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Calle"
                        value={calle}
                        onChangeText={setCalle}
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Número"
                                keyboardType="numeric"
                                value={numeroPuerta}
                                onChangeText={setNumeroPuerta}
                            />
                        </View>

                        <View style={styles.halfInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="CP"
                                keyboardType="numeric"
                                value={cp}
                                onChangeText={setCp}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Teléfono</Text>

                    {telefonos.map((t, i) => (
                        <TextInput
                            key={i}
                            style={styles.input}
                            placeholder={`Número ${i + 1}`}
                            keyboardType="phone-pad"
                            value={t}
                            onChangeText={text => cambiarTelefono(i, text)}
                        />
                    ))}

                    <TouchableOpacity onPress={agregarTelefono}>
                        <Text style={styles.addButtonText}>+ Agregar teléfono</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={crearCuenta}>
                <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>

            <Modal visible={modalPaisDocVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>País documento</Text>
                        <ScrollView>
                            {paises.map(item => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.option}
                                    onPress={() => {
                                        setPaisDocumento(item);
                                        setModalPaisDocVisible(false);
                                    }}
                                >
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <Modal visible={modalTipoDocVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Tipo documento</Text>
                        <ScrollView>
                            {tiposDocumento.map(item => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.option}
                                    onPress={() => {
                                        setTipoDocumento(item);
                                        setModalTipoDocVisible(false);
                                    }}
                                >
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <Modal visible={modalPaisDirVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>País dirección</Text>
                        <ScrollView>
                            {paises.map(item => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.option}
                                    onPress={() => {
                                        setPais(item);
                                        setModalPaisDirVisible(false);
                                    }}
                                >
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingBottom: 40,
    },

    logo: {
        width: '80%',
        height: 180,
        marginTop: 20,
    },

    subtitle: {
        fontSize: 18,
        marginTop: -20,
    },

    formContainer: {
        width: '85%',
        marginTop: 10,
    },

    section: {
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 45,
        marginBottom: 10,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    halfInput: {
        width: '48%',
    },

    selector: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        height: 45,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 10,
    },

    selectorText: {
        color: '#000',
    },

    placeholderText: {
        color: '#999',
    },

    button: {
        backgroundColor: '#1545F4',
        padding: 15,
        borderRadius: 12,
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    addButtonText: {
        color: '#1565FF',
        fontWeight: '600',
        marginTop: 5,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },

    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        maxHeight: '60%',
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    option: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});