import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function NuevoEvento() {
    const [paisLocal, setPaisLocal] = useState('');
    const [paisVisitante, setPaisVisitante] = useState('');
    const [fecha, setFecha] = useState('');
    const [estadio, setEstadio] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [sectorA, setSectorA] = useState(false);
    const [sectorB, setSectorB] = useState(false);
    const [sectorC, setSectorC] = useState(false);
    const [sectorD, setSectorD] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevo Evento</Text>

            <View style={styles.formulario}>
                <Text style={styles.label}>País local</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: Uruguay"
                    value={paisLocal}
                    onChangeText={setPaisLocal}
                />

                <Text style={styles.label}>País visitante</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: Argentina"
                    value={paisVisitante}
                    onChangeText={setPaisVisitante}
                />

                <Text style={styles.label}>Fecha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="15/06/2026"
                    value={fecha}
                    onChangeText={setFecha}
                />

                <Text style={styles.label}>Estadio</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Estadio Centenario"
                    value={estadio}
                    onChangeText={setEstadio}
                />

                <Text style={styles.label}>Capacidad total</Text>
                <TextInput
                    style={styles.input}
                    placeholder="60000"
                    keyboardType="numeric"
                    value={capacidad}
                    onChangeText={setCapacidad}
                />
                <Text style={styles.label}>Sectores habilitados</Text>

                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxText}>Sector A</Text>

                    <TouchableOpacity
                        onPress={() => setSectorA(!sectorA)}
                        style={[
                            styles.checkbox,
                            sectorA && styles.checkboxSeleccionado,
                        ]}
                    >
                        <Text style={styles.checkboxIcon}>
                            {sectorA ? '✓' : ''}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxText}>Sector B</Text>

                    <TouchableOpacity
                        onPress={() => setSectorB(!sectorB)}
                        style={[
                            styles.checkbox,
                            sectorB && styles.checkboxSeleccionado,
                        ]}
                    >
                        <Text style={styles.checkboxIcon}>
                            {sectorB ? '✓' : ''}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxText}>Sector C</Text>

                    <TouchableOpacity
                        onPress={() => setSectorC(!sectorC)}
                        style={[
                            styles.checkbox,
                            sectorC && styles.checkboxSeleccionado,
                        ]}
                    >
                        <Text style={styles.checkboxIcon}>
                            {sectorC ? '✓' : ''}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxText}>Sector D</Text>

                    <TouchableOpacity
                        onPress={() => setSectorD(!sectorD)}
                        style={[
                            styles.checkbox,
                            sectorD && styles.checkboxSeleccionado,
                        ]}
                    >
                        <Text style={styles.checkboxIcon}>
                            {sectorD ? '✓' : ''}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.boton}>
                    <Text style={styles.textoBoton}>
                        Crear Evento
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
        paddingTop: 60,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 30,
    },

    formulario: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#051F3B',
        marginBottom: 8,
        marginTop: 12,
    },

    input: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },

    boton: {
        backgroundColor: '#051F3B',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 25,
    },

    textoBoton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    checkboxText: {
        fontSize: 16,
        color: '#051F3B',
    },

    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#9D9D9D',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    checkboxSeleccionado: {
        backgroundColor: '#0F6ED4',
        borderColor: '#0F6ED4',
    },

    checkboxIcon: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});