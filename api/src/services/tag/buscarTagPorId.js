const TagModel = require('../../models/Tag');

/**
 * Método responsável por buscar uma tag pelo seu ID.
 * @param {Number} tag_id
 * @param {Array|null} attributes
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
const buscarTagPorId = async (tag_id, attributes = null) => {
    // Busca a tag
    return await TagModel.findByPk(tag_id, {
        attributes: attributes || ['id', 'nome', 'cor']
    });
}

module.exports = buscarTagPorId