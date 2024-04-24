const Livro = require("../../models/Livro")
const findAllPagination = require("../../utils/findAllPagination")
const { Sequelize } = require('sequelize');

/**
 * Método responsável por retornar todos os livros cadastrados,
 * com paginação.
 * @param {number} page - Página atual
 * @param {number} limit - Limite de itens por página
 * @param {Object} busca - Objeto com os filtros
 * @returns {Object} - Objeto com os dados da paginação
 */
const getAllLivros = async (page = 1, limit = 20, busca = {}) => {

    const where = {};

    // Se o parâmetro busca.titulo existir, adiciona na busca
    if(busca.titulo) where.titulo = { [Sequelize.Op.like]: `%${busca.titulo}%` };
    if(busca.categoria) where.categoria_id = busca.categoria;
    if(busca.subcategoria) where.subcategoria_id = busca.subcategoria;


    return await findAllPagination(Livro, page, limit, where);
}

module.exports = getAllLivros;