import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require('../../assets/images/img_fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Image
            source={require('../../assets/images/logo_blanco.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.subtitle}>
            Viví el mundial 2026
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerButtonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  safe: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },

  logo: {
    width: '100%',
    height: 120,
    marginTop: 60,
  },

  subtitle: {
    marginTop: 83,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 24,
  },

  buttonsContainer: {
    marginTop: 117,
    width: '80%',
    gap: 16,
  },

  loginButton: {
    height: 56,
    borderRadius: 15,
    backgroundColor: '#1545F4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },

  registerButton: {
    height: 56,
    borderRadius: 15,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#7EA5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
});