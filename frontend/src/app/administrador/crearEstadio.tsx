import { useEstadios } from '@/context/EstadiosContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function CrearEstadio() {
    const { agregarEstadio } = useEstadios();
    const router = useRouter();

    const [nombre, setNombre] = useState('');
    const [pais, setPais] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [capacidadA, setCapacidadA] = useState('');
    const [precioA, setPrecioA] = useState('');

    const [capacidadB, setCapacidadB] = useState('');
    const [precioB, setPrecioB] = useState('');

    const [capacidadC, setCapacidadC] = useState('');
    const [precioC, setPrecioC] = useState('');

    const [capacidadD, setCapacidadD] = useState('');
    const [precioD, setPrecioD] = useState('');
    const [modalPaisVisible, setModalPaisVisible] = useState(false);

    const paises = ['México', 'Estados Unidos', 'Canadá'];

    const guardarEstadio = () => {
        if (!nombre || !pais || !ciudad || !capacidad) {
            return;
        }

        const capacidadTotal = Number(capacidad);

        const totalSectores =
            Number(capacidadA || 0) +
            Number(capacidadB || 0) +
            Number(capacidadC || 0) +
            Number(capacidadD || 0);

        if (totalSectores > capacidadTotal) {
            alert(
                'La suma de las capacidades de los sectores supera la capacidad total del estadio.'
            );
            return;
        }

        agregarEstadio({
            id: Date.now(),
            nombre,
            pais,
            ciudad,
            capacidad: capacidadTotal,

            sectores: {
                A: {
                    capacidad: Number(capacidadA || 0),
                    precio: Number(precioA || 0),
                },
                B: {
                    capacidad: Number(capacidadB || 0),
                    precio: Number(precioB || 0),
                },
                C: {
                    capacidad: Number(capacidadC || 0),
                    precio: Number(precioC || 0),
                },
                D: {
                    capacidad: Number(capacidadD || 0),
                    precio: Number(precioD || 0),
                },
            },
        });

        router.push('/administrador/estadios');
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

                <Text style={styles.title}>Crear Estadio</Text>

                <View style={styles.formContainer}>
                    {/* NOMBRE */}
                    <Text style={styles.label}>Nombre del estadio</Text>
                    <TextInput
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Estadio Nacional"
                        placeholderTextColor="#6B7280"
                        style={styles.input}
                    />

                    {/* PAÍS (SELECTOR) */}
                    <Text style={styles.label}>País</Text>
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => setModalPaisVisible(true)}
                    >
                        <Text style={pais ? styles.selectorText : styles.placeholderText}>
                            {pais || 'Seleccione país'}
                        </Text>
                    </TouchableOpacity>

                    {/* CIUDAD */}
                    <Text style={styles.label}>Ciudad</Text>
                    <TextInput
                        value={ciudad}
                        onChangeText={setCiudad}
                        placeholder="Ej. Ciudad de México"
                        placeholderTextColor="#6B7280"
                        style={styles.input}
                    />

                    {/* CAPACIDAD */}
                    <Text style={styles.label}>Capacidad total</Text>
                    <TextInput
                        value={capacidad}
                        onChangeText={setCapacidad}
                        placeholder="Ej. 8700"
                        placeholderTextColor="#6B7280"
                        keyboardType="numeric"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Sector A</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Capacidad Sector A"
                        keyboardType="numeric"
                        value={capacidadA}
                        onChangeText={setCapacidadA}
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
                        value={capacidadB}
                        onChangeText={setCapacidadB}
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
                        value={capacidadC}
                        onChangeText={setCapacidadC}
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
                        value={capacidadD}
                        onChangeText={setCapacidadD}
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
                    >
                        <Text style={styles.saveButtonText}>
                            Guardar estadio
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* MODAL PAÍS */}
                <Modal
                    visible={modalPaisVisible}
                    transparent
                    animationType="fade"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>
                                Seleccione país
                            </Text>

                            {paises.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setPais(item);
                                        setModalPaisVisible(false);
                                    }}
                                >
                                    <Text style={styles.modalItemText}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity
                                onPress={() => setModalPaisVisible(false)}
                            >
                                <Text style={styles.closeModal}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
    selector: {
        height: 55,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        justifyContent: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#F9FAFB',
        marginBottom: 18,
    },

    selectorText: {
        fontSize: 16,
        color: '#111827',
    },

    placeholderText: {
        fontSize: 16,
        color: '#6B7280',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#111827',
    },

    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    modalItemText: {
        fontSize: 16,
        color: '#111827',
    },

    closeModal: {
        marginTop: 15,
        textAlign: 'center',
        color: '#2563EB',
        fontWeight: '600',
    },
});