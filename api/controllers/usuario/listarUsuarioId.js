const UsuarioService = require('../../services/usuario.service');

const listarUsuarioID = async (req, res) => {
    try {
        // Busca o usuário pelo ID
        const usuario = await UsuarioService.getUsuarioPorId(req.params.id);

        // Retorna o usuário
        res.status(200).json({
            error: false,
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

module.exports = listarUsuarioID;