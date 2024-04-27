const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

// Cria a rota
const router = express.Router();

// Importa o controller
const Tarefa = require('../controllers/tarefa.controller');

// Rotas de usuário
router.get('/', authMiddleware.validaLogin, Tarefa.listarTarefas);
router.post('/', authMiddleware.validaLogin, Tarefa.inserirTarefa);

// Tarefa e Tag
router.delete('/:tarefa_id/tag/:tag_id', authMiddleware.validaLogin, Tarefa.removerTagTarefa);
router.post('/:tarefa_id/tag/:tag_id', authMiddleware.validaLogin, Tarefa.adicionarTagTarefa);


module.exports = router;