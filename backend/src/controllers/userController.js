// ============================================
// CONTROLLER DE USUÁRIOS
// ============================================
// Responsabilidade: Lógica de negócio dos usuários

const { pool } = require('../config/database');

// Listar todos os usuários
async function listUsers(req, res) {
    try {
        const [rows] = await pool.execute('SELECT id, full_name, username, email, created_at FROM users ORDER BY id DESC');
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
}

// Buscar usuário por ID
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute(
            'SELECT id, full_name, username, email, created_at FROM users WHERE id = ?',
            [id]
        );

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
}

// Criar novo usuário
async function createUser(req, res) {
    try {
        const { full_name, username, email, password } = req.body;

        // Validação básica
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

        const [result] = await pool.execute(
            'INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)',
            [full_name, username, email, password]
        );

        // Buscar o usuário criado (sem senha)
        const [newUser] = await pool.execute(
            'SELECT id, full_name, username, email, created_at FROM users WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            data: newUser[0]
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);

        // Erro de duplicado
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

// Atualizar usuário
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { full_name, username, email } = req.body;

        // Verificar se usuário existe
        const [existingUser] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        if (existingUser.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        // Validação básica
        if (!full_name || !username || !email) {
            return res.status(400).json({
                success: false,
                message: 'Campos obrigatórios: full_name, username, email'
            });
        }

        await pool.execute(
            'UPDATE users SET full_name = ?, username = ?, email = ? WHERE id = ?',
            [full_name, username, email, id]
        );

        // Buscar o usuário atualizado
        const [updatedUser] = await pool.execute(
            'SELECT id, full_name, username, email, created_at FROM users WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            message: 'Usuário atualizado com sucesso',
            data: updatedUser[0]
        });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);

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

// Deletar usuário
async function deleteUser(req, res) {
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
}

module.exports = {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
