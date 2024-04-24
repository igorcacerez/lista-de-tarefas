const Livro = require('../../models/Livro');

/**
 * Método responsável por alterar um livro
 * @param altera
 * @param id
 * @returns {Promise<*>}
 */
const alterarLivro = async (altera, id) => {

    // Altera o livro
    return await Livro.update(altera, {
        where: {
            id: id
        }
    });
}

module.exports = alterarLivro;