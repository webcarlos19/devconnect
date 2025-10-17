// Arquivo para testar a API - execute com Node.js
// node test-api.js

const baseURL = 'http://localhost:3000';

// Função para fazer requisições HTTP
async function makeRequest(method, endpoint, data = null) {
    const url = `${baseURL}${endpoint}`;
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(`\n${method} ${endpoint}`);
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        console.error(`Erro na requisição ${method} ${endpoint}:`, error.message);
    }
}

// Testes da API
async function testAPI() {
    console.log('🧪 Iniciando testes da API...');

    // 1. Testar rota raiz
    await makeRequest('GET', '/');

    // 2. Listar usuários (pode estar vazio inicialmente)
    await makeRequest('GET', '/users');

    // 3. Criar novo usuário
    const newUser = await makeRequest('POST', '/users', {
        name: 'Teste User',
        email: 'teste@email.com',
        status: 'active'
    });

    if (newUser && newUser.data) {
        const userId = newUser.data.id;

        // 4. Buscar usuário por ID
        await makeRequest('GET', `/users/${userId}`);

        // 5. Atualizar usuário
        await makeRequest('PUT', `/users/${userId}`, {
            name: 'Teste User Atualizado',
            email: 'teste.atualizado@email.com',
            status: 'inactive'
        });

        // 6. Listar usuários novamente
        await makeRequest('GET', '/users');

        // 7. Deletar usuário
        await makeRequest('DELETE', `/users/${userId}`);

        // 8. Tentar buscar usuário deletado (deve retornar 404)
        await makeRequest('GET', `/users/${userId}`);
    }

    // 9. Teste de validação - email inválido
    await makeRequest('POST', '/users', {
        name: 'Teste Inválido',
        email: 'email-invalido',
        status: 'active'
    });

    // 10. Teste de validação - campos obrigatórios
    await makeRequest('POST', '/users', {
        status: 'active'
    });

    console.log('\n✅ Testes concluídos!');
}

// Verificar se o fetch está disponível (Node.js 18+)
if (typeof fetch === 'undefined') {
    console.log('❌ Este script requer Node.js 18+ ou a instalação do pacote node-fetch');
    console.log('Para Node.js < 18, instale: npm install node-fetch');
    console.log('E adicione no início do arquivo: const fetch = require("node-fetch");');
} else {
    testAPI();
}