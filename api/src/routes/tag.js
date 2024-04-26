const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

// Cria a rota
const router = express.Router();

// Importa o controller
const Tag = require('../controllers/tag.controller');

// Rotas de usuário
router.get('/', authMiddleware.validaLogin, Tag.listarTodas);
router.post('/', authMiddleware.validaLogin, Tag.inserirTag);
router.put('/:id', authMiddleware.validaLogin, Tag.alterarTag);
router.delete('/:id', authMiddleware.validaLogin, Tag.deletarTag);

module.exports = router;