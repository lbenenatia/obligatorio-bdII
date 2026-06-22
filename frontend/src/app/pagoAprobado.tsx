import { QRService } from '@/services/QRService';
import { FontAwesome6 } from '@expo/vector-icons';
import * as Print from 'expo-print';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PagoAprobado() {
    const router = useRouter();
    const { compraId, entradaIds, match, date, time, estadio, sector, cantidad } =
        useLocalSearchParams<{
            compraId: string;
            entradaIds: string;
            match: string;
            date: string;
            time: string;
            estadio: string;
            sector: string;
            cantidad: string;
        }>();

    const primeraEntradaId = Number(entradaIds?.split(',')[0]);

    const descargarPDF = async () => {
        if (!primeraEntradaId) return;

        const entrada = await QRService.generar(primeraEntradaId);
        const qrValue = entrada.codigoQR ?? `entrada-${primeraEntradaId}`;

        const html = `
    <html>
      <body style="margin:0; padding:0; background:#051F3B; font-family:Arial;">

        <div style="
          display:flex;
          justify-content:center;
          padding-top:60px;
        ">

          <!-- CARD -->
          <div style="
            width:320px;
            background:#fff;
            border-radius:25px;
            overflow:hidden;
            text-align:center;
          ">

            <!-- CONTENIDO -->
            <div style="padding:0 20px 20px 20px;">

              <h2 style="font-size:18px; margin:10px 0;">
                ${match}
              </h2>

              <p style="font-size:14px; margin:5px 0; color:#444;">
                ${date} • ${time}
              </p>

              <p style="font-size:14px; margin:5px 0; color:#444;">
                Estadio: ${estadio}
              </p>

              <p style="font-size:14px; margin:5px 0; color:#444;">
                Sector ${sector} • Entradas ${cantidad}
              </p>

              <hr style="margin:15px 0;" />

              <!-- QR -->
              <div style="margin:15px 0;">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(qrValue)}"
                />
              </div>

              <p style="font-size:11px; color:#777;">
                Entrada oficial - QR válido para ingreso
              </p>

            </div>
          </div>

        </div>
      </body>
    </html>
    `;

        const { uri } = await Print.printToFileAsync({
            html,
        });

        await Sharing.shareAsync(uri);
    };
    return (
        <View style={styles.container}>
            <View style={styles.successContainer}>
                <View style={styles.iconContainer}>
                    <FontAwesome6
                        name="check"
                        size={90}
                        color="#FFFFFF"
                    />
                </View>

                <Text style={styles.title}>
                    ¡Compra realizada!
                </Text>

                <Text style={styles.subtitle}>
                    Su compra ha sido confirmada. ¡Disfruta el mundial 2026!
                </Text>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.primaryButton}
                    onPress={() => router.push('/misEntradas')}>
                    <Text style={styles.primaryButtonText}>
                        Ver mis entradas
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}
                    onPress={() => router.push('/(tabs)/home')}>
                    <Text style={styles.secondaryButtonText}>
                        Volver al inicio
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => {
                        if (!primeraEntradaId) return;

                        router.push({
                            pathname: '/transfer',
                            params: {
                                id: String(primeraEntradaId),
                                match,
                                date,
                                time,
                                estadio,
                                sector,
                            },
                        });
                    }}
                >
                    <FontAwesome6
                        name="share-nodes"
                        size={18}
                        color="#1958D0"
                    />

                    <Text style={styles.footerButtonText}>
                        Transferir
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={descargarPDF}
                >
                    <Text style={styles.footerButtonText}>
                        Descargar
                    </Text>

                    <FontAwesome6
                        name="download"
                        size={18}
                        color="#1958D0"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: 40,
    },

    successContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
        marginTop: 60,
    },

    iconContainer: {
        width: 140,
        height: 140,
        borderRadius: 90,
        backgroundColor: '#67D661',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 18,
        color: '#6B7280',
        textAlign: 'center',
    },

    actionsContainer: {
        alignItems: 'center',
        gap: 16,
        marginTop: 105,
    },

    primaryButton: {
        width: 340,
        height: 62,
        backgroundColor: '#1958D0',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'regular',
    },

    secondaryButton: {
        width: 280,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondaryButtonText: {
        color: '#1958D0',
        fontSize: 25,
        fontWeight: 'regular',
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        height: 115,
        backgroundColor: '#D9D9D9',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        gap: 12,
    },

    footerButton: {
        width: 150,
        height: 48,

        backgroundColor: '#FFFFFF',
        borderRadius: 12,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        gap: 8,
    },

    footerButtonText: {
        color: '#1958D0',
        fontSize: 16,
        fontWeight: '600',
    },
});
