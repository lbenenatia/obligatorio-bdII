import { useAuth } from '@/context/AuthContext';
import { mostrarAlerta } from '@/utils/alert';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Screen from './screen';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef<TextInput>(null);
    const router = useRouter();
    const { login } = useAuth();
    const iniciarSesion = async () => {
        if (!email.trim() || !password.trim()) {
            mostrarAlerta(
                'Campos incompletos',
                'Ingresá correo y contraseña'
            );
            return;
        }

        try {
            const usuario = await login(email, password);

            switch (usuario.rol) {
                case 'ADMINISTRADOR':
                    router.replace('/administrador/home');
                    break;

                case 'FUNCIONARIO':
                    router.replace('/funcionario/home');
                    break;

                case 'GENERAL':
                    router.replace('/(tabs)/home');
                    break;
            }
        } catch (error) {
            mostrarAlerta(
                'Error',
                'Correo o contraseña incorrectos'
            );
        }
    };
    return (
        <Screen>
            <SafeAreaView style={styles.safe}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
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
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => passwordRef.current?.focus()}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contraseña</Text>
                            <TextInput
                                ref={passwordRef}
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="#B3B3B3"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                returnKeyType="done"
                                onSubmitEditing={iniciarSesion}
                            />
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={iniciarSesion}
                        >
                            <Text style={styles.buttonText}>
                                Iniciar sesión
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.topText}>¿Olvidaste tu contraseña?</Text>

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
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    safe: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },

    flex: {
        flex: 1,
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
        marginTop: 18,
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