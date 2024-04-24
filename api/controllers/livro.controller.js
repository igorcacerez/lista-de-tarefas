// Importa os controllers
const inserirLivro = require('./livro/inserirLivro');
const listarLivros = require('./livro/listarLivros');
const detalhesLivro = require('./livro/detalhesLivro');
const alterarLivro = require('./livro/alterarLivro');
const alterarCapaLivro = require('./livro/alterarCapa');

// Exporta os controllers
module.exports = {
    inserirLivro,
    listarLivros,
    detalhesLivro,
    alterarLivro,
    alterarCapaLivro
}