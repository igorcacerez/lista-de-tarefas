const TarefaModel = require('../../models/tarefa');

/**
 * Retorna uma tarefa com base no id
 * @param {Number} tarefa_id
 * @param {Array|null|string} attributes
 * @returns {Promise<*>}
 */
const getTarefaPorId = async (tarefa_id, attributes = null) => {
    let config = {
        include: {
            association: 'tags',
            attributes: ['id', 'nome', 'cor'],
            through: { attributes: [] }
        }
    };

    if (attributes !== "*") {
        config.attributes =  attributes || { exclude: ['usuario_id'] };
    }

    return await TarefaModel.findByPk(tarefa_id, config);
}

module.exports = getTarefaPorId;