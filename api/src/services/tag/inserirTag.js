const TagModel = require('../../models/Tag');

/**
 * Método responsável por inserir uma nova tag.
 * @param {Object} tag
 * @param {Object} usuario
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
const inserirTag = async (tag, usuario) => {
    try {
        tag.usuario_id = usuario.id;

        return await TagModel.create(tag);

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = inserirTag