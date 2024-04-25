const Usuario = require('../../models/Usuario');

/**
 * Método para buscar um usuário pelo ID	
 * @param {int} id 
 * @throws {Error} Usuário não encontrado
 * @returns {Usuario} Usuario
 */
const getUsuarioPorId = async (id) => {
    // Busca o usuário pelo ID
    const usuario = await Usuario.findByPk(id);

    // Se não encontrar, retorna erro
    if(!usuario) throw new Error('Usuário não encontrado!');

    // Retorna o usuário
    return usuario;
};

module.exports = getUsuarioPorId