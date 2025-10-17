const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração da conexão com MySQL
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

// Criar pool de conexões
const pool = mysql.createPool(dbConfig);

// Função para inicializar o banco de dados
async function initDatabase() {
    try {
        // Criar banco de dados se não existir
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        });

        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log(`Database '${process.env.DB_NAME}' criado/verificado com sucesso`);
        await connection.end();

        // Criar tabela users se não existir
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('Tabela users criada/verificada com sucesso');

    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
    }
}

module.exports = { pool, initDatabase };