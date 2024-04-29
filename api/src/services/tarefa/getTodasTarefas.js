const TarefaModel = require('../../models/Tarefa');
const {Op} = require("sequelize");

/**
 * Retorna todas as tarefas de um usuário com base em um where
 * @param {Number} usuario_id
 * @param {Object} where
 * @returns {Promise<Model[]>}
 */
const getTodasTarefas = async (usuario_id, where = {}) => {

    let whereBusca = {}

    // Adiciona a condição de usuario_id ao where
    whereBusca.usuario_id = usuario_id;

    // Adiciona a condição de data_inicio e data_fim ao where
    if (where.data_inicio && where.data_fim) {
        whereBusca['data_inicio'] = {
            [Op.between]: [where.data_inicio, where.data_fim]
        }
    }

    return await TarefaModel.findAll({
        where: whereBusca,
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