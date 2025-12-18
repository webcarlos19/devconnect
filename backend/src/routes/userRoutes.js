// ============================================
// ROTAS DE USUÁRIOS
// ============================================
// Responsabilidade: Definir endpoints de users

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users - Listar todos os usuários
router.get('/', userController.listUsers);

// GET /users/:id - Buscar usuário por ID
router.get('/:id', userController.getUserById);

// POST /users - Criar novo usuário
router.post('/', userController.createUser);

// PUT /users/:id - Atualizar usuário
router.put('/:id', userController.updateUser);

// DELETE /users/:id - Deletar usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;
