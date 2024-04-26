const TagService = require('../../services/tag.service');

/**
 * Método responsável por deletar uma tag.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deletarTag = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.userLogin.id;

        // Verifica se possui permissão para deletar a tag
        const tag = await TagService
            .buscarTagPorId(id, ['usuario_id']);

        if (!tag) throw new Error('Tag não encontrada');
        if (tag.usuario_id !== usuario_id) throw new Error('Você não tem permissão para deletar essa tag.');

        // Deleta a tag
        await TagService.deletarTag(id);

        return res.status(200)
            .json({
                error: false,
                data: null
            });

    } catch (error) {
        return res.status(400).json({
            error: error.message,
            data: null
        });
    }
}

module.exports = deletarTag;