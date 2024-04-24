const UsuarioService = require('../../services/usuario.service');

/**
 * Função responsável por validar o email do usuário
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const validarEmail = async (req, res) => {

    // Recupera o token
    const { token } = req.body;

    try {
        // Busca o usuário pelo email
        let usuario = await UsuarioService.getUsuarioTokenEmail(token);

        // Valida o email
        usuario.email_verificado = null;

        // Salva o usuário
        await UsuarioService.alterarUsuario(usuario);
        usuario = await UsuarioService.getUsuarioPorId(usuario.id); // Retorna o usuário atualizado

        // Retorna o usuário
        res.status(200).json({
            error: null,
            data: {
                usuario: usuario
            }
        });

    } catch (error) {
        res.status(400).json({
            error: error.message,
            data: null
        });
    }
};

module.exports = validarEmail;