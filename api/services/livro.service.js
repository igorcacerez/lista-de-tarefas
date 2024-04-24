// Importa os serviços de livros
const inserirLivro = require('./livro/inserirLivro');
const getAllLivros = require('./livro/getAllLivros');
const getDetailsLivro = require('./livro/getDetailsLivro');
const alterarLivro = require('./livro/alterarLivro');

// Exporta os serviços de livros
module.exports = {
    inserirLivro,
    getAllLivros,
    getDetailsLivro,
    alterarLivro
}