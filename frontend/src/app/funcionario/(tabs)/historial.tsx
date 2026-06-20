import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Historial() {
    const [fecha, setFecha] = useState(new Date());
    const [mostrarPicker, setMostrarPicker] = useState(false);

    const formatearFecha = (date: Date) => {
        return date.toLocaleDateString("es-UY");
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Historial de Validaciones
            </Text>

            <View style={styles.panel}>

                <TouchableOpacity
                    style={styles.filtro}
                    onPress={() => setMostrarPicker(true)}
                >
                    <Text style={styles.filtroTexto}>
                        {formatearFecha(fecha)}
                    </Text>
                </TouchableOpacity>

                {mostrarPicker && (
                    <DateTimePicker
                        value={fecha}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                        onChange={(event, selectedDate) => {
                            setMostrarPicker(false);

                            if (event.type === "set" && selectedDate) {
                                setFecha(selectedDate);
                            }
                        }}
                    />
                )}

                <View style={styles.lista}>

                    <View style={styles.item}>
                        <Text style={styles.itemTexto}>Entrada #12345</Text>

                        <View style={[styles.badge, styles.valida]}>
                            <Text style={[styles.badgeTexto, styles.textoValida]}>
                                Válida
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divisor} />

                    <View style={styles.item}>
                        <Text style={styles.itemTexto}>Entrada #67890</Text>

                        <View style={[styles.badge, styles.invalida]}>
                            <Text style={[styles.badgeTexto, styles.textoInvalida]}>
                                Inválida
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divisor} />

                    <View style={styles.item}>
                        <Text style={styles.itemTexto}>Entrada #54321</Text>

                        <View style={[styles.badge, styles.usada]}>
                            <Text style={[styles.badgeTexto, styles.textoUsada]}>
                                Usada
                            </Text>
                        </View>
                    </View>

                </View>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051F3B',
        paddingTop: 60,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        paddingHorizontal: 20,
        marginBottom: 10,
    },

    panel: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 15,
        alignItems: 'center',
    },

    filtroWrapper: {
        width: '90%',
    },

    filtro: {
        backgroundColor: '#F3F4F6',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        width: '90%',
    },

    filtroTexto: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    lista: {
        marginTop: 15,
        width: '100%',
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
    },

    itemTexto: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    divisor: {
        height: 1,
        backgroundColor: '#E5E7EB',
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },

    badgeTexto: {
        fontSize: 12,
        fontWeight: '700',
    },

    /* VÁLIDA */
    valida: {
        backgroundColor: '#DCFCE7',
    },
    textoValida: {
        color: '#16A34A',
    },

    /* INVÁLIDA */
    invalida: {
        backgroundColor: '#FEE2E2',
    },
    textoInvalida: {
        color: '#DC2626',
    },

    /* USADA */
    usada: {
        backgroundColor: '#FEF3C7',
    },
    textoUsada: {
        color: '#D97706',
    },
});