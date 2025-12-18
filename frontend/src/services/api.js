// ============================================
// SERVIÇO DE API
// ============================================
// Responsabilidade: Comunicação com o backend

const API_URL = 'http://localhost:3000';

// Registrar novo usuário
export async function register(userData) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao registrar usuário');
        }

        return data;
    } catch (error) {
        throw error;
    }
}

// Fazer login
export async function login(credentials) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login');
        }

        return data;
    } catch (error) {
        throw error;
    }
}

// Buscar dados do usuário autenticado
export async function getMe(token) {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao buscar usuário');
        }

        return data;
    } catch (error) {
        throw error;
    }
}

// Salvar token no localStorage
export function saveToken(token) {
    localStorage.setItem('devconnect_token', token);
}

// Obter token do localStorage
export function getToken() {
    return localStorage.getItem('devconnect_token');
}

// Remover token (logout)
export function removeToken() {
    localStorage.removeItem('devconnect_token');
}

// Verificar se usuário está autenticado
export function isAuthenticated() {
    return !!getToken();
}
