// ============================================
// ROTAS DE AUTENTICAÇÃO
// ============================================
// Responsabilidade: Definir endpoints de auth (login/registro)

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// POST /auth/register - Registrar novo usuário
router.post('/register', authController.register);

// POST /auth/login - Fazer login
router.post('/login', authController.login);

// GET /auth/me - Obter dados do usuário logado (rota protegida)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
