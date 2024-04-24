const UsuarioService = require('../../services/usuario.service');
const TokenAdapter = require('../../adapters/token');

/**
 * Método para realizar o login do usuário
 * @param {*} req
 * @param {*} res
 * @returns
 * @throws {Error} E-mail ou senha informados estão incorretos.
 * @throws {Error} Usuário não encontrado
 */
const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Busca o usuário pelo email e senha
        const usuario = await UsuarioService.getUsuarioPorEmailSenha(email, senha);

        // Cria o token
        const token = await TokenAdapter.createToken({
            usuario: usuario
        });

        // Retorna o token
        res.status(200).json({
            error: false,
            data: {
                token: token
            }
        });

    } catch (error) {
        res.status(400).json({
            error: error.message,
            data: null
        });
    }
};

module.exports = login;