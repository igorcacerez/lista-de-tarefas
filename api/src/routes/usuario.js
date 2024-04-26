const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

// Cria a rota
const router = express.Router();

// Importa o controller
const Usuario = require('../controllers/usuario.controller');

// Rotas de usuário
router.post('/login', Usuario.login);
router.post('/validar-email', Usuario.validarEmail);
router.post('/', Usuario.inserirUsuario);
router.put('/', authMiddleware.validaLogin, Usuario.alterarUsuario);

module.exports = router;