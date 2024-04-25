/**
 * Método responsável por retornar todos os elementos de uma tabela,
 * com paginação.
 * @param {Object} model - Model do Sequelize
 * @param {number} page - Página atual
 * @param {number} limit  - Limite de itens por página
 * @param {Object} where - Objeto com as condições da busca
 * @returns {Object} - Objeto com os dados da paginação
 */
const findAllPagination = async (model, page = 1, limit = 10, where = {}) => {
    page = parseInt(page);
    limit = parseInt(limit);
    
    const offset = (page - 1) * limit;

    // Busca os livros com a paginação  
    const { count, rows } = await model.findAndCountAll({offset, limit, where});
  
    return {
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        items: rows
    };
}

module.exports = findAllPagination;