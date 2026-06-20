import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#D9D9D9',
                    height: 80,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarActiveTintColor: '#051F3B',
                tabBarInactiveTintColor: '#6B7280',
            }}
        >

            <Tabs.Screen
                name="home"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="escanearEntrada"
                options={{
                    title: 'Escanear',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="qrcode-scan"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="historial"
                options={{
                    title: 'Historial',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="time-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="perfil"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

        </Tabs>
    );
}