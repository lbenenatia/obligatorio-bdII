import { api, borrarToken, guardarToken, obtenerToken, setOnSesionExpirada } from '@/services/api';
import { Usuario } from '@/types/usuario';
import { useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

interface LoginResponse {
    token: string;
    email: string;
    rol: string;
    usuarioId: number;
}

type AuthContextType = {
    usuario: Usuario | null;
    cargando: boolean;
    login: (email: string, contrasena: string) => Promise<Usuario>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState(true);
    const router = useRouter();

    const cargarPerfil = async () => {
        const perfil = await api.get<Usuario>('/usuarios/me');
        setUsuario(perfil);
        return perfil;
    };

    useEffect(() => {
        setOnSesionExpirada(() => {
            setUsuario(null);
            router.replace('/login');
        });

        return () => setOnSesionExpirada(null);
    }, [router]);

    useEffect(() => {
        (async () => {
            const token = await obtenerToken();
            if (token) {
                try {
                    await cargarPerfil();
                } catch {
                    // No se borra el token acá: si /usuarios/me falló por un problema
                    // transitorio de red/túnel (no por un 401/403 real), borrarlo
                    // cerraría la sesión de un token todavía válido. Un 401/403 real ya
                    // se maneja en api.ts (borra el token y dispara onSesionExpirada).
                    setUsuario(null);
                }
            }
            setCargando(false);
        })();
    }, []);

    const login = async (email: string, contrasena: string) => {
        const response = await api.post<LoginResponse>('/auth/login', { email, contrasena });
        await guardarToken(response.token);
        return cargarPerfil();
    };

    const logout = async () => {
        await borrarToken();
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
