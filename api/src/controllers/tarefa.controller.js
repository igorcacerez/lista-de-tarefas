const inserirTarefa = require('./tarefa/inserirTarefa');
const listarTarefas = require('./tarefa/listarTarefas');

// Tarefa e Tag
const removerTagTarefa = require('./tag_tarefa/removerTagTarefa');
const adicionarTagTarefa = require('./tag_tarefa/adicionarTagTarefa');

module.exports = {
    inserirTarefa,
    listarTarefas,
    removerTagTarefa,
    adicionarTagTarefa
}