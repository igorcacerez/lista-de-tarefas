const TarefaModel = require('../../models/Tarefa');

/**
 * Retorna todas as tarefas de um usuário com base em um where
 * @param {Number} usuario_id
 * @param {Object} where
 * @returns {Promise<Model[]>}
 */
const getTodasTarefas = async (usuario_id, where = {}) => {

    // Adiciona a condição de usuario_id ao where
    where.usuario_id = usuario_id;

    return await TarefaModel.findAll({
        where: where,
        include: {
            association: 'tags',
            attributes: ['id', 'nome', 'cor'],
            through: { attributes: [] }
        },
        attributes: {
            exclude: ['usuario_id']
        },
        order: [
            ['data_inicio', 'ASC']
        ]
    });
};

module.exports = getTodasTarefas;