import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function RegisterScreen() {
    const router = useRouter();
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >

            {/* Logo */}
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Subtítulo */}
            <Text style={styles.subtitle}>
                Paso 2 de 2
            </Text>

            {/* Formulario */}
            <View style={styles.formContainer}>

                {/* Parte 1 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Documento</Text>

                    {/* País */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>País</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Seleccionar país"
                        />
                    </View>

                    {/* Tipo y Número */}
                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Tipo</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Tipo"
                            />
                        </View>

                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Número</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Número"
                            />
                        </View>
                    </View>
                </View>

                {/* Parte 2 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dirección</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>País</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="País"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Localidad</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Localidad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Calle</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Calle"
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Número</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Número"
                            />
                        </View>

                        <View style={styles.halfInput}>
                            <Text style={styles.label}>CP</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="CP"
                            />
                        </View>
                    </View>
                </View>

                {/* Parte 3 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Teléfono</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Número</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Número de teléfono"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+ Agregar teléfono</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Botón */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/home')}
            >
                <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFFFFF',
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
        color: '#000',
        textAlign: 'center',
        marginTop: -20,
    },

    formContainer: {
        width: '85%',
        marginTop: 11,
    },

    section: {
        marginBottom: 11,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },

    inputGroup: {
        marginBottom: 8,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    halfInput: {
        width: '48%',
    },

    input: {
        height: 43,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    addButton: {
        marginTop: 12,
        alignSelf: 'flex-start',
    },

    addButtonText: {
        color: '#1565FF',
        fontSize: 14,
        fontWeight: '600',
    },

    button: {
        width: '80%',
        height: 59,
        borderRadius: 15,
        backgroundColor: '#1545F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});