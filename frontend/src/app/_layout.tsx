import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ComprasProvider } from '../context/ComprasContext';
import { EstadiosProvider } from '../context/EstadiosContext';
import { EventoProvider } from '../context/EventosContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <EventoProvider>
        <EstadiosProvider>
          <ComprasProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </ComprasProvider>
        </EstadiosProvider>
      </EventoProvider>
    </SafeAreaProvider>
  );
}