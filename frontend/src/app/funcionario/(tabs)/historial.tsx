import { EntradaService } from "@/services/EntradaService";
import { Entrada } from "@/types/entrada";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// @react-native-community/datetimepicker no tiene implementacion en web (renderiza null
// y solo tira un console.warn). En web usamos un <input type="date"> nativo del navegador.
const fechaALocalISO = (date: Date) => {
    const anio = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
};

// Estilo plano (no via StyleSheet.create) porque va directo al prop `style` de un <input>
// del DOM, no de un componente de react-native-web.
const estiloInputFechaWeb: React.CSSProperties = {
    backgroundColor: '#F3F4F6',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    width: '90%',
    border: 'none',
    outline: 'none',
    fontSize: 14,
    fontWeight: 600,
    color: '#111827',
};

export default function Historial() {
    const [fecha, setFecha] = useState(new Date());
    const [mostrarPicker, setMostrarPicker] = useState(false);
    const [entradas, setEntradas] = useState<Entrada[]>([]);

    useEffect(() => {
        EntradaService.misValidadas().then(setEntradas).catch(() => {});
    }, []);

    const formatearFecha = (date: Date) => {
        return date.toLocaleDateString("es-UY");
    };

    const entradasDelDia = entradas.filter(e => {
        if (!e.fechaConsumo) return false;
        return new Date(e.fechaConsumo).toDateString() === fecha.toDateString();
    });

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Historial de Validaciones
            </Text>

            <View style={styles.panel}>

                {/* FILTRO */}
                {Platform.OS === "web" ? (
                    React.createElement("input", {
                        type: "date",
                        value: fechaALocalISO(fecha),
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            if (!e.target.value) return;
                            const [anio, mes, dia] = e.target.value.split("-").map(Number);
                            setFecha(new Date(anio, mes - 1, dia));
                        },
                        style: estiloInputFechaWeb,
                    })
                ) : (
                    <TouchableOpacity
                        style={styles.filtro}
                        onPress={() => setMostrarPicker(true)}
                    >
                        <Text style={styles.filtroTexto}>
                            {formatearFecha(fecha)}
                        </Text>
                    </TouchableOpacity>
                )}

                {/* PICKER (no aplica en web, ver arriba) */}
                {Platform.OS !== "web" && mostrarPicker && (
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

                {/* LISTA DE ENTRADAS */}
                <View style={styles.lista}>
                    {entradasDelDia.length === 0 ? (
                        <Text style={styles.itemTexto}>
                            No hay validaciones en esta fecha.
                        </Text>
                    ) : (
                        entradasDelDia.map((entrada, index) => (
                            <View key={entrada.id}>
                                <View style={styles.item}>
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemId}>
                                            Entrada #{entrada.id}
                                        </Text>

                                        <Text style={styles.itemTexto}>
                                            {entrada.equipoLocal} vs {entrada.equipoVisitante} • Sector {entrada.sectorCodigo}, Asiento {entrada.numeroAsiento}
                                        </Text>
                                    </View>

                                    <View style={[styles.badge, styles.valida]}>
                                        <Text style={[styles.badgeTexto, styles.textoValida]}>
                                            Validada
                                        </Text>
                                    </View>
                                </View>

                                {index < entradasDelDia.length - 1 && (
                                    <View style={styles.divisor} />
                                )}
                            </View>
                        ))
                    )}
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

    itemInfo: {
        flex: 1,
        marginRight: 10,
    },

    itemId: {
        fontSize: 15,
        fontWeight: '700',
        color: '#051F3B',
        marginBottom: 2,
    },

    itemTexto: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7280',
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