// ============================================
// ROTAS DE POSTS
// ============================================
// Responsabilidade: Definir endpoints de posts e likes

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /posts - Listar todos os posts
router.get('/', postController.listPosts);

// GET /posts/:id - Buscar post por ID
router.get('/:id', postController.getPostById);

// POST /posts - Criar novo post
router.post('/', postController.createPost);

// PUT /posts/:id - Atualizar post
router.put('/:id', postController.updatePost);

// DELETE /posts/:id - Deletar post
router.delete('/:id', postController.deletePost);

// POST /posts/:id/like - Dar like em um post
router.post('/:id/like', postController.likePost);

// DELETE /posts/:id/like - Remover like de um post
router.delete('/:id/like', postController.unlikePost);

module.exports = router;
