const inserirTarefa = require('./tarefa/inserirTarefa');
const listarTarefas = require('./tarefa/listarTarefas');
const alterarTarefa = require('./tarefa/alterarTarefa');
const deletarTarefa = require('./tarefa/deletarTarefa');

// Tarefa e Tag
const removerTagTarefa = require('./tag_tarefa/removerTagTarefa');
const adicionarTagTarefa = require('./tag_tarefa/adicionarTagTarefa');

module.exports = {
    inserirTarefa,
    listarTarefas,
    removerTagTarefa,
    adicionarTagTarefa,
    alterarTarefa,
    deletarTarefa
}