import { useCompras } from '@/context/ComprasContext';
import { useEventos } from '@/context/EventosContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function CompraScreen() {
    const { eventos } = useEventos();
    const { compras } = useCompras();
    const router = useRouter();
    const entradasVendidas = (
        sectorId: string
    ) => {
        return compras
            .filter(
                c =>
                    c.eventoId === Number(id) &&
                    c.sector === sectorId
            )
            .reduce(
                (acc, c) => acc + c.cantidad,
                0
            );
    };
    const disponibles = (
        capacidad: number,
        sectorId: string
    ) => {
        return capacidad - entradasVendidas(sectorId);
    };

    const {
        id,
        match,
        date,
        time,
        estadio,
    } = useLocalSearchParams();
    const evento = eventos.find(
        e => e.id === Number(id)
    );
    const sectoresDisponibles =
        evento?.sectores
            ? Object.entries(evento.sectores)
            : [];
    const [cantidad, setCantidad] = useState(1);

    const [sectorSeleccionado, setSectorSeleccionado] =
        useState<'A' | 'B' | 'C' | 'D'>('A');

    const sectorActual =
        evento?.sectores?.[
        sectorSeleccionado as keyof typeof evento.sectores
        ];

    const total = useMemo(() => {
        return cantidad * (sectorActual?.precio ?? 0);
    }, [cantidad, sectorActual]);

    const maxDisponibles =
        sectorActual
            ? disponibles(
                sectorActual.capacidad,
                sectorSeleccionado
            )
            : 0;

    const aumentar = () => {
        if (cantidad < maxDisponibles) {
            setCantidad(prev => prev + 1);
        }
    };

    const disminuir = () => {
        setCantidad(prev => Math.max(1, prev - 1));
    };

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>

                <Image
                    source={require('../../assets/images/estadio.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{match}</Text>
                <Text style={styles.subtitle}>{date}</Text>
                <Text style={styles.subtitle}>{time} - {estadio}</Text>
            </View>

            <View style={styles.optionsContainer}>
                {sectoresDisponibles.map(([idSector, info]) => {
                    const quedan =
                        disponibles(
                            info.capacidad,
                            idSector
                        );

                    return (
                        <TouchableOpacity
                            key={idSector}
                            style={[
                                styles.optionCard,
                                sectorSeleccionado === idSector
                                    ? styles.optionCardSelected
                                    : styles.optionCardInactive,
                            ]}
                            onPress={() =>
                                setSectorSeleccionado(
                                    idSector as any
                                )
                            }
                        >
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionTitle}>
                                    Sector {idSector}
                                </Text>

                                <Text style={styles.optionSubtitle}>
                                    USD {info.precio}
                                </Text>
                            </View>

                            <Text style={styles.optionPrice}>
                                Quedan {quedan}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.counterContainer}>
                <TouchableOpacity
                    style={styles.counterButton}
                    onPress={disminuir}
                >
                    <Text style={styles.counterButtonText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.counterValue}>{cantidad}</Text>

                <TouchableOpacity
                    style={styles.counterButton}
                    onPress={aumentar}
                >
                    <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.summaryCard}>
                <Text style={styles.summaryText}>
                    Sub Total:{" "}
                    <Text style={styles.summaryTextBold}>
                        USD {total}
                    </Text>
                </Text>

                <TouchableOpacity
                    style={styles.summaryButton}
                    onPress={() =>
                        router.push({
                            pathname: '/pago',
                            params: {
                                eventoId: String(id ?? ''),
                                match: String(match ?? ''),
                                date: String(date ?? ''),
                                time: String(time ?? ''),
                                estadio: String(estadio ?? ''),
                                sector: sectorSeleccionado,
                                cantidad: String(cantidad),
                                precio: String(sectorActual?.precio ?? 0),
                            },
                        })
                    }
                >
                    <Text style={styles.summaryButtonText}>
                        Continuar compra
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        paddingBottom: 40,
    },
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

    imageContainer: {
        width: '100%',
        backgroundColor: '#0C437B',
        height: 200,
    },
    image: {
        marginTop: 40,
        width: '100%',
        height: 173,
    },
    content: {
        padding: 20,
        gap: 12,
        alignItems: 'center',
        marginTop: 17,
    },

    title: {
        width: '90%',
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },

    subtitle: {
        width: '80%',
        color: '#000',
        fontSize: 20,
        textAlign: 'left',
        marginTop: -6,
    },
    optionsContainer: {
        marginTop: -10,
        gap: 16,
    },
    optionCard: {
        width: '90%',
        height: 110,
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        borderWidth: 2,
    },

    optionCardSelected: {
        backgroundColor: 'rgba(50, 93, 233, 0.3)',
        borderColor: 'rgba(0, 12, 246, 0.4)',
    },

    optionCardInactive: {
        backgroundColor: 'rgba(185, 191, 210, 0.3)',
        borderColor: 'rgba(68, 68, 69, 0.4)',
    },

    radioContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
    },

    radioSelected: {
        backgroundColor: 'rgba(50, 93, 233, 0.3)',
        borderColor: 'rgba(0, 12, 246, 0.4)',
    },

    radioInactive: {
        backgroundColor: 'rgba(185, 191, 210, 0.3)',
        borderColor: 'rgba(68, 68, 69, 0.4)',
    },

    optionTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    optionTitle: {
        fontSize: 20,
        fontWeight: 'regular',
        color: '#000',
    },

    optionSubtitle: {
        fontSize: 20,
        color: '#374151',
        marginTop: 4,
    },

    optionPrice: {
        fontSize: 20,
        fontWeight: 'regular',
        color: '#374151',
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    counterButton: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)',
    },

    counterButtonText: {
        color: '#000000',
        fontSize: 25,
        fontWeight: 'regular',
    },

    counterValue: {
        marginHorizontal: 40,
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
    },
    summaryCard: {
        width: '90%',
        height: 126,
        alignSelf: 'center',
        backgroundColor: '#1958D0',
        borderRadius: 20,

        marginTop: 15,

        justifyContent: 'center',
        alignItems: 'center',
    },

    summaryText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'regular',
        marginBottom: 15,
    },

    summaryTextBold: {
        fontWeight: 'bold',
    },

    summaryButton: {
        width: 250,
        height: 45,

        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 12,

        backgroundColor: 'transparent',

        justifyContent: 'center',
        alignItems: 'center',
    },

    summaryButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'regular',
    },
});