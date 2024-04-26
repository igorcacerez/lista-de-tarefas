const TagModel = require('../../models/Tag');
const buscarTagPorId = require('./buscarTagPorId');

/**
 * Método responsável por alterar uma tag e retornar a tag alterada.
 * @param {Object} altera
 * @param {number} id
 * @returns {Promise<*>}
 */
const alterarTag = async (altera, id) => {
    try {
        await TagModel.update(altera, {
            where: {
                id: id
            }
        });

        return await buscarTagPorId(id)

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = alterarTag