import { AuthService } from '@/services/AuthService';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const iniciarSesion = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert(
                'Campos incompletos',
                'Ingresá correo y contraseña'
            );
            return;
        }

        try {
            const usuario = await AuthService.login(
                email,
                password
            );

            switch (usuario.rol) {
                case 'ADMIN':
                    router.replace('/administrador/home');
                    break;

                case 'FUNCIONARIO':
                    router.replace('/funcionario/home');
                    break;

                case 'USUARIO':
                    router.replace('/(tabs)/home');
                    break;
            }
        } catch (error) {
            Alert.alert(
                'Error',
                'Correo o contraseña incorrectos'
            );
        }
    };
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.headerContainer}>
                <Text style={styles.title}>Iniciar sesión</Text>
                <Text style={styles.subtitle}>
                    Ingresá tus datos para continuar
                </Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Correo electrónico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@correo.com"
                        placeholderTextColor="#B3B3B3"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#B3B3B3"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.topText}>¿Olvidaste tu contraseña?</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={iniciarSesion}
                >
                    <Text style={styles.buttonText}>
                        Iniciar sesión
                    </Text>
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
        marginTop: 32,
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
        marginTop: 50, 
    },

    inputGroup: {
        marginBottom: 28,
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
        marginTop: 15, 
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
        marginTop: 32, 
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },

    bottomText: {
        marginTop: 42,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    registerLink: {
        color: '#1565FF',
        fontWeight: '600',
    },

});