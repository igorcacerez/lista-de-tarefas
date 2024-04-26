const TagModel = require('../../models/Tag');

/**
 * Método responsável por deletar uma tag e
 * retornar a quantidade de linhas afetadas.
 * @param {number} id
 * @returns {Promise<number>}
 * @throws {Error} Tag não encontrada
 */
const deletarTag = async (id) => {
    try {
        const deleta = await TagModel.destroy({
            where: {
                id: id
            }
        });

        // verifica se a tag não foi deletada
        if (deleta === 0) throw new Error('Tag não encontrada');

        return deleta;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = deletarTag