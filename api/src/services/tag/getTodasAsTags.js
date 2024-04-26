const TagModel = require('../../models/Tag');

/**
 * Método responsável por retornar todas as tags cadastradas pelo usuário.
 * @param {Number} usuario_id
 * @param {Array|null} attributes
 * @returns {Promise<Model[]>}
 */
const getTodasAsTags = async (usuario_id, attributes = null) => {
    // Busca todas as tags
    return await TagModel.findAll({
        where: {
            usuario_id: usuario_id
        },
        order: [
            ['nome', 'ASC']
        ],
        attributes: attributes || ['id', 'nome', 'cor']
    });
}

module.exports = getTodasAsTags