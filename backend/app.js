// API com Node.js, Express e MySQL

const express = require('express');
const cors = require('cors');
const { pool, initDatabase } = require('./database');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Inicializar banco de dados
initDatabase();

// ============ ROTAS PARA USERS ============

// GET - Listar todos os usuários
app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM users ORDER BY id DESC');
        res.json({
            success: true,
            message: 'Usuários listados com sucesso',
            data: rows
        });
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
});

// GET - Buscar usuário por ID
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Usuário encontrado',
            data: rows[0]
        });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
});

// POST - Criar novo usuário
app.post('/users', async (req, res) => {
    try {
        const { name, email, status } = req.body;

        // Validação básica
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Nome e email são obrigatórios'
            });
        }

        // Validar formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Formato de email inválido'
            });
        }

        const userStatus = status || 'active';

        const [result] = await pool.execute(
            'INSERT INTO users (name, email, status) VALUES (?, ?, ?)',
            [name, email, userStatus]
        );

        // Buscar o usuário criado
        const [newUser] = await pool.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            data: newUser[0]
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);

        // Erro de email duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Este email já está em uso'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
});

// PUT - Atualizar usuário
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, status } = req.body;

        // Verificar se usuário existe
        const [existingUser] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        if (existingUser.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        // Validação básica
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Nome e email são obrigatórios'
            });
        }

        // Validar formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Formato de email inválido'
            });
        }

        const userStatus = status || 'active';

        await pool.execute(
            'UPDATE users SET name = ?, email = ?, status = ? WHERE id = ?',
            [name, email, userStatus, id]
        );

        // Buscar o usuário atualizado
        const [updatedUser] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Usuário atualizado com sucesso',
            data: updatedUser[0]
        });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);

        // Erro de email duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Este email já está em uso por outro usuário'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
});

// DELETE - Deletar usuário
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar se usuário existe
        const [existingUser] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        if (existingUser.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        await pool.execute('DELETE FROM users WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Usuário deletado com sucesso'
        });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
});

// ============ ROTA RAIZ ============
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API MySQL funcionando!',
        endpoints: {
            'GET /users': 'Listar todos os usuários',
            'GET /users/:id': 'Buscar usuário por ID',
            'POST /users': 'Criar novo usuário',
            'PUT /users/:id': 'Atualizar usuário',
            'DELETE /users/:id': 'Deletar usuário'
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
    console.log(`📊 Database: ${process.env.DB_NAME}`);
});
