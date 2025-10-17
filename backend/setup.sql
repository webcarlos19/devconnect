-- Comandos SQL para configurar o banco de dados manualmente (se necessário)

-- 1. Criar banco de dados
CREATE DATABASE IF NOT EXISTS devconnect;

-- 2. Usar o banco de dados
USE devconnect;

-- 3. Criar tabela users
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Inserir dados de exemplo (opcional)
INSERT INTO users (name, email, status) VALUES 
('Carlos Silva', 'carlos@email.com', 'active'),
('Ana Santos', 'ana@email.com', 'active'),
('João Oliveira', 'joao@email.com', 'inactive');

-- 5. Consultar todos os usuários
SELECT * FROM users;

-- 6. Verificar estrutura da tabela
DESCRIBE users;