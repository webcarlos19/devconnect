// ============================================
// CONTROLLER DE COMENTÁRIOS
// ============================================
// Responsabilidade: Lógica de negócio dos comentários

const { pool } = require('../config/database');

// Listar comentários de um post
async function getCommentsByPost(req, res) {
    try {
        const { postId } = req.params;

        // Verificar se post existe
        const [post] = await pool.execute('SELECT id FROM posts WHERE id = ?', [postId]);
        if (post.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Post não encontrado'
            });
        }

        const [rows] = await pool.execute(`
            SELECT 
                c.id,
                c.content,
                c.created_at,
                u.id as user_id,
                u.full_name,
                u.username
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ?
            ORDER BY c.created_at ASC
        `, [postId]);

        res.json({
            success: true,
            message: 'Comentários listados com sucesso',
            data: rows
        });
    } catch (error) {
        console.error('Erro ao listar comentários:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// Criar comentário
async function createComment(req, res) {
    try {
        const { postId } = req.params;
        const { user_id, content } = req.body;

        // Validação básica
        if (!user_id || !content) {
            return res.status(400).json({
                success: false,
                message: 'Campos obrigatórios: user_id, content'
            });
        }

        // Verificar se post existe
        const [post] = await pool.execute('SELECT id FROM posts WHERE id = ?', [postId]);
        if (post.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Post não encontrado'
            });
        }

        // Verificar se usuário existe
        const [user] = await pool.execute('SELECT id FROM users WHERE id = ?', [user_id]);
        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)',
            [user_id, postId, content]
        );

        // Buscar o comentário criado
        const [newComment] = await pool.execute(`
            SELECT 
                c.id,
                c.content,
                c.created_at,
                u.id as user_id,
                u.full_name,
                u.username
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.id = ?
        `, [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Comentário criado com sucesso',
            data: newComment[0]
        });
    } catch (error) {
        console.error('Erro ao criar comentário:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// Deletar comentário
async function deleteComment(req, res) {
    try {
        const { id } = req.params;

        // Verificar se comentário existe
        const [existingComment] = await pool.execute('SELECT * FROM comments WHERE id = ?', [id]);
        if (existingComment.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Comentário não encontrado'
            });
        }

        await pool.execute('DELETE FROM comments WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Comentário deletado com sucesso'
        });
    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

module.exports = {
    getCommentsByPost,
    createComment,
    deleteComment
};
