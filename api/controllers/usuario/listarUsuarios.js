const UsuarioService = require('../../services/usuario.service');

const listarUsuarios = async (req, res) => {
    try {
        const { page, limit } = req.query;

        // Busca todos os usuários
        const usuarios = await UsuarioService.getTodosOsUsuarios(page, limit);

        // Retorna os usuários
        res.status(200).json({
            error: false,
            data: usuarios
        });

    } catch (error) {
        res.status(400).json({
            error: error.message,
            data: null
        });
    }
};

module.exports = listarUsuarios;