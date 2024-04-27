const TarefaModel = require('../../models/tarefa');

/**
 * Deleta uma tarefa do banco de dados.
 * @param {number} tarefa_id
 * @returns {Promise<number>}
 */
const deletarTarefa = async (tarefa_id) => {
    try {
        return await TarefaModel.destroy({
            where: {
                id: tarefa_id
            }
        });

    } catch (e) {
        throw new Error('Erro ao deletar a tarefa. ' + e.message);
    }
}

module.exports = deletarTarefa;