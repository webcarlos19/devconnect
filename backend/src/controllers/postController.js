// ============================================
// CONTROLLER DE POSTS
// ============================================
// Responsabilidade: Lógica de negócio dos posts

const { pool } = require('../config/database');

// Listar todos os posts (com dados do autor e contagem de likes)
async function listPosts(req, res) {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                p.id,
                p.content,
                p.created_at,
                u.id as user_id,
                u.full_name,
                u.username,
                (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
        `);

        res.json({
            success: true,
            message: 'Posts listados com sucesso',
            data: rows
        });
    } catch (error) {
        console.error('Erro ao listar posts:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// Buscar post por ID
async function getPostById(req, res) {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute(`
            SELECT 
                p.id,
                p.content,
                p.created_at,
                u.id as user_id,
                u.full_name,
                u.username,
                (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Post não encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Post encontrado',
            data: rows[0]
        });
    } catch (error) {
        console.error('Erro ao buscar post:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// Criar novo post
async function createPost(req, res) {
    try {
        const { user_id, content } = req.body;

        // Validação básica
        if (!user_id || !content) {
            return res.status(400).json({
                success: false,
                message: 'Campos obrigatórios: user_id, content'
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
            'INSERT INTO posts (user_id, content) VALUES (?, ?)',
            [user_id, content]
        );

        // Buscar o post criado com dados do autor
        const [newPost] = await pool.execute(`
            SELECT 
                p.id,
                p.content,
                p.created_at,
                u.id as user_id,
                u.full_name,
                u.username,
                0 as likes_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = ?
        `, [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Post criado com sucesso',
            data: newPost[0]
        });
    } catch (error) {
        console.error('Erro ao criar post:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// Atualizar post
async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const { content } = req.body;

        // Verificar se post existe
        const [existingPost] = await pool.execute('SELECT * FROM posts WHERE id = ?', [id]);
        if (existingPost.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Post não encontrado'
            });
        }

        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'Campo obrigatório: content'
            });
        }

        await pool.execute('UPDATE posts SET content = ? WHERE id = ?', [content, id]);

        // Buscar o post atualizado
        const [updatedPost] = await pool.execute(`
            SELECT 
                p.id,
                p.content,
                p.created_at,
                u.id as user_id,
                u.full_name,
                u.username,
                (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = ?
        `, [id]);

        res.json({
            success: true,
            message: 'Post atualizado com sucesso',
            data: updatedPost[0]
        });
    } catch (error) {
        console.error('Erro ao atualizar post:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// Deletar post
async function deletePost(req, res) {
    try {
        const { id } = req.params;

        // Verificar se post existe
        const [existingPost] = await pool.execute('SELECT * FROM posts WHERE id = ?', [id]);
        if (existingPost.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Post não encontrado'
            });
        }

        await pool.execute('DELETE FROM posts WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Post deletado com sucesso'
        });
    } catch (error) {
        console.error('Erro ao deletar post:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// Dar like em um post
async function likePost(req, res) {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'Campo obrigatório: user_id'
            });
        }

        // Verificar se post existe
        const [post] = await pool.execute('SELECT id FROM posts WHERE id = ?', [id]);
        if (post.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Post não encontrado'
            });
        }

        await pool.execute(
            'INSERT INTO likes (user_id, post_id) VALUES (?, ?)',
            [user_id, id]
        );

        res.status(201).json({
            success: true,
            message: 'Like adicionado com sucesso'
        });
    } catch (error) {
        // Like duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Você já curtiu este post'
            });
        }

        console.error('Erro ao dar like:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// Remover like de um post
async function unlikePost(req, res) {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'Campo obrigatório: user_id'
            });
        }

        const [result] = await pool.execute(
            'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
            [user_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Like não encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Like removido com sucesso'
        });
    } catch (error) {
        console.error('Erro ao remover like:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

module.exports = {
    listPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost
};
