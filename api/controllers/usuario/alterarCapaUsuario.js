const UsuarioService = require('../../services/usuario.service'); 
const { uploadFileAws } = require('../../adapters/aws');

/**
 * Método para alterar a foto de capa do usuário
 * @param {*} req
 * @param {*} res
 * @returns
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
 */
const alterarCapaUsuario = async (req, res) => {
    const {id} = req.userLogin;
    const file = req.file;

    // Caminho 
    const path = `usuarios/${id}/foto_capa/`;

    try {
        // Realiza o upload do arquivo para o AWS S3  
        const foto_capa = await uploadFileAws(file, path);

        // Atualiza o perfil do usuário
        await UsuarioService.alterarUsuario({foto_capa}, id);

        // Busca o usuário alterado
        const usuarioAlterado = await UsuarioService.getUsuarioPorId(id);

        // Retorna o usuário atualizado
        return await res.status(200).json({
            error: false,
            data: {
                usuario: usuarioAlterado,
                foto_capa
            }
        });

    } catch (error) {
        return await res.status(500).json({ error: error.message, data: null});
    }
}

module.exports = alterarCapaUsuario;