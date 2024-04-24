const Usuario = require('../../models/Usuario');
const bcrypt = require('bcryptjs');

/**
 * Método para alterar um usuário
 * @param altera
 * @param id
 * @returns {Promise<*>}
 */
const alterarUsuario = async (altera, id) => {

    // Verifica se deseja alterar a senha
    if (altera.senha) {
        // Criptografa a senha
        altera.senha = bcrypt.hashSync(altera.senha, 8); // 8 é o número de rounds
    }

    // Altera o usuário
    return await Usuario.update(altera, {
        where: {
            id: id
        }
    });
}

module.exports = alterarUsuario;