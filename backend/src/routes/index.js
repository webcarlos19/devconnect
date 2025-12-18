// ============================================
// ARQUIVO DE ROTAS PRINCIPAL
// ============================================
// Responsabilidade: Centralizar todas as rotas

const express = require('express');
const router = express.Router();

// Importar rotas
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Usar rotas
router.use('/auth', authRoutes);  // Autenticação (login/registro)
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/', commentRoutes); // Comentários usam /posts/:postId/comments

// Rota raiz da API
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 DevConnect API funcionando!',
        version: '1.0.0',
        endpoints: {
            auth: {
                'POST /auth/register': 'Registrar novo usuário',
                'POST /auth/login': 'Fazer login',
                'GET /auth/me': 'Obter dados do usuário logado (requer token)'
            },
            users: {
                'GET /users': 'Listar todos os usuários',
                'GET /users/:id': 'Buscar usuário por ID',
                'POST /users': 'Criar novo usuário',
                'PUT /users/:id': 'Atualizar usuário',
                'DELETE /users/:id': 'Deletar usuário'
            },
            posts: {
                'GET /posts': 'Listar todos os posts',
                'GET /posts/:id': 'Buscar post por ID',
                'POST /posts': 'Criar novo post',
                'PUT /posts/:id': 'Atualizar post',
                'DELETE /posts/:id': 'Deletar post',
                'POST /posts/:id/like': 'Dar like em um post',
                'DELETE /posts/:id/like': 'Remover like de um post'
            },
            comments: {
                'GET /posts/:postId/comments': 'Listar comentários de um post',
                'POST /posts/:postId/comments': 'Criar comentário',
                'DELETE /comments/:id': 'Deletar comentário'
            }
        }
    });
});

module.exports = router;
