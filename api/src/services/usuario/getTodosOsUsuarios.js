const Usuario = require('../../models/Usuario');
const findAllPagination = require('../../utils/findAllPagination');

/**
 * Método responsável por retornar todos os usuários cadastrados,
 * com paginação.
 * @param {number} page - Página atual
 * @param {number} limit - Limite de itens por página
 * @returns {Object} - Objeto com os dados da paginação
 */
const getTodosOsUsuarios = async (page = 1, limit = 10) => {
    return await findAllPagination(Usuario, page, limit);
};

module.exports = getTodosOsUsuarios