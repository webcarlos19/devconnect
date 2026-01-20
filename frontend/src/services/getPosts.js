const API_URL = 'http://localhost:3000';

export async function getPosts() {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao buscar posts');
        }

        // Retornar apenas o array de posts
        return data.data || [];
    } catch (error) {
        throw error;
    }
}