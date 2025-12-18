// ============================================
// CONTROLLER DE AUTENTICAÇÃO
// ============================================
// Responsabilidade: Login, Registro e validação de usuários

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

// ============ REGISTRO DE USUÁRIO ============
async function register(req, res) {
    try {
        const { full_name, username, email, password } = req.body;

        // Validação dos campos obrigatórios
        if (!full_name || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos são obrigatórios: full_name, username, email, password'
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

        // Validar tamanho da senha
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'A senha deve ter no mínimo 6 caracteres'
            });
        }

        // Validar username (sem espaços, apenas letras, números e underscore)
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                success: false,
                message: 'Username inválido. Use apenas letras, números e underscore'
            });
        }

        // Criptografar a senha (hash)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Inserir usuário no banco
        const [result] = await pool.execute(
            'INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)',
            [full_name, username, email, hashedPassword]
        );

        // Buscar o usuário criado (sem senha)
        const [newUser] = await pool.execute(
            'SELECT id, full_name, username, email, created_at FROM users WHERE id = ?',
            [result.insertId]
        );

        // Gerar token JWT
        const token = jwt.sign(
            { id: newUser[0].id, username: newUser[0].username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: 'Usuário registrado com sucesso',
            data: {
                user: newUser[0],
                token
            }
        });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);

        // Erro de duplicado (email ou username já existe)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Username ou email já está em uso'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// ============ LOGIN DE USUÁRIO ============
async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Validação dos campos
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email e senha são obrigatórios'
            });
        }

        // Buscar usuário pelo email
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        // Verificar se usuário existe
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Email ou senha incorretos'
            });
        }

        const user = users[0];

        // Verificar senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Email ou senha incorretos'
            });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Retornar usuário sem a senha
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            message: 'Login realizado com sucesso',
            data: {
                user: userWithoutPassword,
                token
            }
        });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// ============ OBTER USUÁRIO LOGADO (ME) ============
async function getMe(req, res) {
    try {
        // req.user vem do middleware de autenticação
        const [users] = await pool.execute(
            'SELECT id, full_name, username, email, created_at FROM users WHERE id = ?',
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Usuário autenticado',
            data: users[0]
        });

    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

module.exports = {
    register,
    login,
    getMe
};
