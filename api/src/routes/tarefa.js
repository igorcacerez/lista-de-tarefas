const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

// Cria a rota
const router = express.Router();

// Importa o controller
const Tarefa = require('../controllers/tarefa.controller');

// Rotas de usuário
router.get('/', authMiddleware.validaLogin, Tarefa.listarTarefas);
router.post('/', authMiddleware.validaLogin, Tarefa.inserirTarefa);
router.put('/:id', authMiddleware.validaLogin, Tarefa.alterarTarefa);
router.delete('/:id', authMiddleware.validaLogin, Tarefa.deletarTarefa);

// Filtrar tarefas por data
router.get('/data', authMiddleware.validaLogin, Tarefa.filtrarTarefaData);

// Tarefa e Tag
router.delete('/:tarefa_id/tag/:tag_id', authMiddleware.validaLogin, Tarefa.removerTagTarefa);
router.post('/:tarefa_id/tag/:tag_id', authMiddleware.validaLogin, Tarefa.adicionarTagTarefa);


module.exports = router;