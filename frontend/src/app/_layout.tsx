import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ComprasProvider } from '../context/ComprasContext';


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ComprasProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ComprasProvider>
    </SafeAreaProvider>
  );
}