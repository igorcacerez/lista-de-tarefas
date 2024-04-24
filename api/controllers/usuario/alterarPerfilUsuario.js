const UsuarioService = require('../../services/usuario.service'); 
const { uploadFileAws } = require('../../adapters/aws');

/**
 * Método para alterar a foto de perfil do usuário
 * @param {*} req
 * @param {*} res
 * @returns
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
 */
const alterarPerfilUsuario = async (req, res) => {
    const {id} = req.userLogin;
    const file = req.file;

    // Caminho 
    const path = `usuarios/${id}/foto_perfil/`;

    try {
        // Realiza o upload do arquivo para o AWS S3  
        const foto_perfil = await uploadFileAws(file, path);

        // Atualiza o perfil do usuário
        await UsuarioService.alterarUsuario({foto_perfil}, id);

        // Busca o usuário alterado
        const usuarioAlterado = await UsuarioService.getUsuarioPorId(id);

        // Retorna o usuário atualizado
        return await res.status(200).json({
            error: false,
            data: {
                usuario: usuarioAlterado,
                foto_perfil
            }
        });

    } catch (error) {
        return await res.status(500).json({ error: error.message, data: null});
    }
}

module.exports = alterarPerfilUsuario;