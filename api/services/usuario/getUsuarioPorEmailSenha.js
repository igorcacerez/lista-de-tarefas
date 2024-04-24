const Usuario = require('../../models/Usuario');
const bcrypt = require('bcryptjs');

/**
 * Método para buscar um usuário pelo email e senha
 * @param {string} email
 * @param {string} senha
 * @throws {Error} E-mail ou senha informados estão incorretos.
 * @returns {Usuario} Usuario
 */ 
const getUsuarioPorEmailSenha = async (email, senha) => {

    // Busca o usuário pelo email e senha
    const usuario = await Usuario.findOne({where: {email: email}});

    // Se não encontrar, retorna erro
    if(!usuario) throw new Error('E-mail ou senha informados estão incorretos.');

    // Verifica se a senha está correta
    const verify = await bcrypt.compare(senha, usuario.senha)
    if(!verify) throw new Error('E-mail ou senha informados estão incorretos.');

    // Retorna o usuário
    return usuario;
};

module.exports = getUsuarioPorEmailSenha