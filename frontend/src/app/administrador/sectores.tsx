import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Perfil() {
    const router = useRouter();
    const [sectores, setSectores] = useState([
        { id: 'A', habilitado: true },
        { id: 'B', habilitado: true },
        { id: 'C', habilitado: false },
        { id: 'D', habilitado: true },
    ]);
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Configurar Sectores</Text>

            <View style={styles.infoContainer}>
                <Image
                    source={require('../../../assets/images/estadio.png')}
                    style={styles.image}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.nombre}>Estadio Centenario</Text>
                    <Text style={styles.info}>Montevideo, Uruguay</Text>
                    <Text style={styles.info}>Capacidad: 60.235</Text>
                </View>
            </View>

            <View style={styles.contentCard}>
                {/* Encabezados */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, { flex: 1 }]}>Sector</Text>
                    <Text style={[styles.headerText, { flex: 1.2 }]}>Capacidad</Text>
                    <Text style={[styles.headerText, { flex: 1 }]}>Precio</Text>
                    <Text style={[styles.headerText, { flex: 1 }]}>Activo</Text>
                </View>

                {sectores.map((sector) => (
                    <View key={sector.id} style={styles.row}>
                        <Text style={styles.sectorText}>
                            Sector {sector.id}
                        </Text>

                        <TextInput
                            style={styles.input}
                            defaultValue="1000"
                            keyboardType="numeric"
                        />

                        <TextInput
                            style={styles.input}
                            defaultValue="2500"
                            keyboardType="numeric"
                        />

                        <Switch
                            value={sector.habilitado}
                            onValueChange={(value) => {
                                setSectores(
                                    sectores.map((s) =>
                                        s.id === sector.id
                                            ? { ...s, habilitado: value }
                                            : s
                                    )
                                );
                            }}
                            trackColor={{
                                false: '#D1D5DB',
                                true: '#22C55E',
                            }}
                        />
                    </View>
                ))}
                <TouchableOpacity style={styles.saveButton}
                onPress={() => router.push('/administrador/estadios')}>
                    <Text style={styles.saveButtonText}>
                        Guardar cambios
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        padding: 20,
    },

    title: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 25,
        alignSelf: 'center',
    },

    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },

    image: {
        width: 110,
        height: 110,
        borderRadius: 16,
        marginRight: 16,
    },

    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    nombre: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    info: {
        color: '#D1D5DB',
        fontSize: 15,
        marginBottom: 4,
    },

    contentCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 22,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,

        elevation: 6,
    },
    tableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 12,
    },

    headerText: {
        fontWeight: 'bold',
        color: '#374151',
        fontSize: 13,
        textAlign: 'center',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },

    sectorText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },

    input: {
        flex: 1,
        height: 44,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginRight: 8,
        backgroundColor: '#F9FAFB',
        textAlign: 'center',
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: '#1958D0',
        height: 55,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },

    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});