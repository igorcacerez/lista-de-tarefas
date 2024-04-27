const TagModel = require('../../models/Tag');

/**
 * Método responsável por buscar uma tag pelo seu ID.
 * @param {Number} tag_id
 * @param {Array|null|string} attributes
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
const buscarTagPorId = async (tag_id, attributes = null) => {
    let config = {};

    if (attributes !== "*") {
        config.attributes =  attributes || ['id', 'nome', 'cor']
    }

    // Busca a tag
    return await TagModel.findByPk(tag_id, config);
}

module.exports = buscarTagPorId