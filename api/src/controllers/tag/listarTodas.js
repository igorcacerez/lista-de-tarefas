const TagService = require('../../services/tag.service');

/**
 * Método responsável por listar todas as tags cadastradas pelo usuário.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const listarTodas = async (req, res) => {
    try {
        const usuario_id = req.userLogin.id;

        // Busca todas as tags
        const tags = await TagService.getTodasAsTags(usuario_id);

        // Retorna as tags
        return await res.status(200).json({
            error: false,
            data: tags
        });

    } catch (error) {
        return await res.status(400).json({ error: error.message, data: null});
    }
};

module.exports = listarTodas;