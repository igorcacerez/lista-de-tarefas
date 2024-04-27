const getTarefaPorId = require('./tarefa/getTarefaPorId');
const getTodasTarefas = require('./tarefa/getTodasTarefas');
const inserirTarefa = require('./tarefa/inserirTarefa');
const alterarTarefa = require('./tarefa/alterarTarefa');
const deletarTarefa = require('./tarefa/deletarTarefa');

module.exports = {
    getTarefaPorId,
    getTodasTarefas,
    inserirTarefa,
    alterarTarefa,
    deletarTarefa
}