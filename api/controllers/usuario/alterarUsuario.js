const UsuarioService = require('../../services/usuario.service'); 

/**
 * Método para alterar as informações de cadastro um usuário
 * @param {*} req
 * @param {*} res
 * @returns
 */ 
const alterarUsuario = async (req, res) => {
    
    try {
        const id = req.userLogin.id;
        const usuario = req.body;

        // Verifica se deseja alterar a senha
        if (usuario.senha) {
            // Verifica se a senha e a confirmação são idênticas
            if (usuario.senha !== usuario.confsenha) {
                throw new Error('As senhas devem ser idênticas');
            }
        }

        // Altera o usuário
        const result = await UsuarioService.alterarUsuario(usuario, id);

        // Verifica se o usuário foi alterado
        if (!result) throw new Error('Ocorreu um erro ao alterar o usuário');

        // Busca o usuário alterado
        const usuarioAlterado = await UsuarioService.getUsuarioPorId(id);

        // Informa o resultado
        return await res.status(200).json({
            error: false,
            data: {
                usuario: usuarioAlterado
            }
        });

    } catch (error) {
        return await res.status(500).json({ error: error.message, data: null});
    }
}

module.exports = alterarUsuario;