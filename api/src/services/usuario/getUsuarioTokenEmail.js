const Usuario = require('../../models/Usuario');

const getUsuarioTokenEmail = async (token) => {
    // Busca o usuário pelo token
    const usuario = await Usuario.findOne({
        where: {
            email_verificado: token
        }
    });

    // Se não encontrar, retorna erro
    if(!usuario) throw new Error('Usuário não encontrado!');

    // Retorna o usuário
    return usuario;
}

module.exports = getUsuarioTokenEmail