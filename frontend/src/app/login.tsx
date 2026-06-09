import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Título y subtítulo */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Iniciar sesión</Text>
                <Text style={styles.subtitle}>
                    Ingresá tus datos para continuar
                </Text>
            </View>

            {/* Formulario */}
            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Correo electrónico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@correo.com"
                        placeholderTextColor="#B3B3B3"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#B3B3B3"
                        secureTextEntry
                    />
                </View>
            </View>

            {/* Sección inferior */}
            <View style={styles.bottomContainer}>
                <Text style={styles.topText}>¿Olvidaste tu contraseña?</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/home')}
                >
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    ¿No tenés cuenta?{' '}
                    <Text
                        style={styles.registerLink}
                        onPress={() => router.push('/register')}
                    >
                        Registrarse
                    </Text>
                </Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },

    logo: {
        width: '80%',
        height: 180,
        marginTop: 60,
    },

    headerContainer: {
        marginTop: 32, // distancia logo → título/subtítulo
        alignItems: 'center',
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000',
    },

    subtitle: {
        marginTop: 8,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },

    formContainer: {
        width: '85%',
        marginTop: 50, // distancia título/subtítulo → formulario
    },

    inputGroup: {
        marginBottom: 28, // distancia entre inputs
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
    },

    bottomContainer: {
        width: '85%',
        alignItems: 'center',
        marginTop: 15, // distancia formulario → primer texto
    },

    topText: {
        fontSize: 14,
        color: '#1565FF',
    },

    button: {
        width: '100%',
        height: 56,
        borderRadius: 15,
        backgroundColor: '#1545F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32, // distancia primer texto → botón
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },

    bottomText: {
        marginTop: 42, // distancia botón → segundo texto
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    registerLink: {
        color: '#1565FF',
        fontWeight: '600',
    },

});