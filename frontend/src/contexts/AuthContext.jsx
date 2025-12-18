// ============================================
// CONTEXTO DE AUTENTICAÇÃO
// ============================================
// Responsabilidade: Gerenciar estado de autenticação global

import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, removeToken, getMe } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar se há token ao carregar a aplicação
        const token = getToken();
        if (token) {
            // Buscar dados do usuário
            getMe(token)
                .then((response) => {
                    setUser(response.data);
                })
                .catch(() => {
                    // Token inválido, remover
                    removeToken();
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const logout = () => {
        removeToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }
    return context;
}
