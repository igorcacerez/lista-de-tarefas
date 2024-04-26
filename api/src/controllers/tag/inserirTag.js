const TagService = require('../../services/tag.service');

/**
 * Método responsável por inserir uma nova tag.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const inserirTag = async (req, res) => {
    try {
        const tag = req.body;
        const usuario = req.userLogin;

        // Valida se informou os campos obrigatórios
        if (!tag?.nome) throw new Error('O campo nome é obrigatório.');

        // Insere a tag
        const novaTag = await TagService.inserirTag(tag, usuario);

        // Retorna a tag inserida
        return await res.status(201).json({
            error: false,
            data: novaTag
        });

    } catch (error) {
        return await res.status(400).json({ error: error.message, data: null});
    }
};

module.exports = inserirTag;