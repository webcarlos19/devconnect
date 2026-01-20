const API_URL = 'http://localhost:3000';

export async function getMe() {
    // Função para buscar dados do usuário autenticado
    try {
        const token = localStorage.getItem('devconnect_token');
        if (!token) {
            throw new Error('Token não encontrado');
        }
        
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao buscar dados do usuário');
        }

        return data;
    } catch (error) {
        throw error;
    }
}