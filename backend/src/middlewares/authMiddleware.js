// ============================================
// MIDDLEWARE DE AUTENTICAÇÃO
// ============================================
// Responsabilidade: Verificar token JWT nas requisições protegidas

const jwt = require('jsonwebtoken');

// Middleware para verificar se o usuário está autenticado
function authMiddleware(req, res, next) {
    try {
        // Pegar o token do header Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token não fornecido. Faça login para continuar.'
            });
        }

        // O token vem no formato "Bearer <token>"
        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            return res.status(401).json({
                success: false,
                message: 'Formato de token inválido'
            });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({
                success: false,
                message: 'Formato de token inválido'
            });
        }

        // Verificar e decodificar o token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token inválido ou expirado'
                });
            }

            // Adicionar dados do usuário na requisição
            req.user = decoded;
            return next();
        });

    } catch (error) {
        console.error('Erro no middleware de autenticação:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
}

// Middleware opcional - não bloqueia, apenas adiciona user se tiver token
function optionalAuthMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next();
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2) {
            return next();
        }

        const [scheme, token] = parts;
        if (!/^Bearer$/i.test(scheme)) {
            return next();
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err) {
                req.user = decoded;
            }
            return next();
        });

    } catch (error) {
        return next();
    }
}

module.exports = { authMiddleware, optionalAuthMiddleware };
