import { FontAwesome6 } from '@expo/vector-icons';
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

                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#000',
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ focused, color }) => (
                        <FontAwesome6
                            name="house"
                            size={20}
                            color={color}
                            solid={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="entrada"
                options={{
                    title: 'Entrada',
                    tabBarIcon: ({ focused, color }) => (
                        <FontAwesome6
                            name="door-open"
                            size={20}
                            color={color}
                            solid={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="transferir"
                options={{
                    title: 'Transferir',
                    tabBarIcon: ({ focused, color }) => (
                        <FontAwesome6
                            name="right-left"
                            size={20}
                            color={color}
                            solid={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ focused, color }) => (
                        <FontAwesome6
                            name="user"
                            size={20}
                            color={color}
                            solid={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}