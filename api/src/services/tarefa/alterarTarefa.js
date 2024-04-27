const TarefaModel = require ( '../../models/Tarefa' );
const getTarefaPorId = require("./getTarefaPorId");

/**
 * Altera uma tarefa no banco de dados.
 * @param {Number} tarefa_id
 * @param {Object} alteracoes
 * @returns {*}
 */
const alterarTarefa = async (tarefa_id, alteracoes) => {
    try {
        await TarefaModel.update(alteracoes, {
            where: {
                id: tarefa_id
            }
        });

        // Retorna a tarefa alterada
        return await getTarefaPorId(tarefa_id);

    } catch (e) {
        throw new Error('Erro ao alterar a tarefa. ' + e.message);
    }
}

module.exports = alterarTarefa;