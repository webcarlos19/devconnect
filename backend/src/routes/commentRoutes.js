// ============================================
// ROTAS DE COMENTÁRIOS
// ============================================
// Responsabilidade: Definir endpoints de comentários

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// GET /posts/:postId/comments - Listar comentários de um post
router.get('/posts/:postId/comments', commentController.getCommentsByPost);

// POST /posts/:postId/comments - Criar comentário em um post
router.post('/posts/:postId/comments', commentController.createComment);

// DELETE /comments/:id - Deletar comentário
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
