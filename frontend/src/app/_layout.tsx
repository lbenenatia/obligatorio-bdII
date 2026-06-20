import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ComprasProvider } from '../context/ComprasContext';
import { EstadiosProvider } from '../context/EstadiosContext';
import { EventoProvider } from '../context/EventosContext';
import { TransferenciasProvider } from '../context/TransferenciasContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <EventoProvider>
        <EstadiosProvider>
          <ComprasProvider>
            <TransferenciasProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </TransferenciasProvider>
          </ComprasProvider>
        </EstadiosProvider>
      </EventoProvider>
    </SafeAreaProvider>
  );
}