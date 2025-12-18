// ============================================
// DEVCONNECT API - ARQUIVO PRINCIPAL
// ============================================
// Responsabilidade: Configurar e iniciar o servidor Express

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar configuração do banco de dados
const { initDatabase } = require('./src/config/database');

// Importar rotas
const routes = require('./src/routes');

// Criar aplicação Express
const app = express();

// ============ MIDDLEWARES ============
app.use(express.json()); // Permite receber JSON no body das requisições
app.use(cors());         // Permite requisições de outras origens (frontend)

// ============ ROTAS ============
app.use('/', routes);

// ============ INICIALIZAÇÃO ============
const PORT = process.env.PORT || 3000;

// Inicializa o banco de dados e depois inicia o servidor
initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log('');
        console.log('🚀 ================================');
        console.log(`🚀 DevConnect API rodando!`);
        console.log(`🚀 http://localhost:${PORT}`);
        console.log(`📊 Database: ${process.env.DB_NAME}`);
        console.log('🚀 ================================');
        console.log('');
    });
});
