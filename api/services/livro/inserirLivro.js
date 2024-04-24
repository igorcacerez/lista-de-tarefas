const Livro = require('../../models/Livro');
const stringToSlug = require('../../utils/stringToSlug');

/**
 * Método para inserir um livro no banco de dados
 * @param {Object} livro - O livro a ser inserido
 * @throws {Error} Caso ocorra um erro durante a inserção
 * @returns {Object} O livro inserido
 */
const inserirLivro = async (livro) => {

    // Cria o slug do livro
    livro.slug = await stringToSlug(livro.titulo); 

    // Insere o livro
    const livroInserido = await Livro.create(livro);

    // Retorna o livro inserido
    return livroInserido
};

module.exports = inserirLivro