import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { mostrarAlerta } from '@/utils/alert';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import Screen from './screen';

export default function RegisterScreen() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);
    const router = useRouter();
    const emailValido = /\S+@\S+\.\S+/;
    const continuar = () => {
        if (
            !nombre.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            mostrarAlerta(
                'Campos incompletos',
                'Debes completar todos los campos'
            );
            return;
        }

        if (!emailValido.test(email)) {
            mostrarAlerta(
                'Correo inválido',
                'Ingresá un correo electrónico válido'
            );
            return;
        }

        if (password.length < 8) {
            mostrarAlerta(
                'Contraseña inválida',
                'La contraseña debe tener al menos 8 caracteres'
            );
            return;
        }

        if (password !== confirmPassword) {
            mostrarAlerta(
                'Error',
                'Las contraseñas no coinciden'
            );
            return;
        }

        router.push({
            pathname: '/register2',
            params: {
                nombre,
                email,
                password,
            },
        });
    };
    return (
        <Screen>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Paso 1 de 2</Text>

                    <Text style={styles.title}>
                        Crear cuenta
                    </Text>

                    <Text style={styles.description}>
                        Completa tus datos para registrarte
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre completo"
                            value={nombre}
                            onChangeText={setNombre}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => emailRef.current?.focus()}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Correo electrónico</Text>
                        <TextInput
                            ref={emailRef}
                            style={styles.input}
                            placeholder="Correo electrónico"
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
                            placeholder="Mínimo 8 caracteres"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirmar contraseña</Text>
                        <TextInput
                            ref={confirmPasswordRef}
                            style={styles.input}
                            placeholder="Repetir contraseña"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            returnKeyType="done"
                            onSubmitEditing={continuar}
                        />
                    </View>
                </View>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={continuar}
                    >
                        <Text style={styles.buttonText}>Continuar</Text>
                    </TouchableOpacity>

                    <Text style={styles.bottomText}>
                        ¿Ya tenés una cuenta?{' '}
                        <Text
                            style={styles.loginLink}
                            onPress={() => router.push('/login')}
                        >
                            Iniciar sesión
                        </Text>
                    </Text>
                </View>
            </View>
        </Screen>
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
        marginTop: 20,
    },

    textContainer: {
        marginTop: 5,
        alignItems: 'center',
        width: '85%',
    },

    text: {
        fontSize: 18,
        fontWeight: 'medium',
        color: '#000',
        textAlign: 'center',
    },

    title: {
        marginTop: 15,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },

    description: {
        marginTop: 10,
        fontWeight: 'medium',
        fontSize: 14,
        color: '#7B8496',
        textAlign: 'center',
    },

    formContainer: {
        width: '85%',
        marginTop: 25,
        gap: 16,
    },

    input: {
        height: 43,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    inputGroup: {
        marginBottom: 5,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },

    bottomContainer: {
        width: '85%',
        alignItems: 'center',
        marginTop: 35,
    },

    button: {
        width: '100%',
        height: 56,
        borderRadius: 15,
        backgroundColor: '#1545F4',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },

    bottomText: {
        marginTop: 20,
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
    },
    loginLink: {
        color: '#1565FF',
        fontWeight: '600',
    },
});