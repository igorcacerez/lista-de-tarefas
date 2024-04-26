const TagService = require('../../services/tag.service');

/**
 * Método responsável por alterar uma tag.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const alterarTag = async (req, res) => {
    try {
        const usuario_id = req.userLogin.id;
        const { id } = req.params;
        const dados = req.body;
        let alteracoes = {};

        // Busca a tag a ser alterada
        const tagExistente = await TagService.buscarTagPorId(id, ['usuario_id']);

        // Validações
        if (!tagExistente) throw new Error('Tag não encontrada.');
        if (tagExistente.usuario_id !== usuario_id) throw new Error('Tag não encontrada.');

        // Verifica se o nome foi informado
        if (dados?.nome) alteracoes.nome = dados.nome;
        if (dados?.cor) alteracoes.cor = dados.cor;

        // Verifica se houve alterações
        if (Object.keys(alteracoes).length === 0) throw new Error('Nenhuma alteração foi informada.');

        // Altera a tag
        const tag = await TagService.alterarTag(alteracoes, id);

        // Retorna a tag
        return await res.status(200).json({
            error: false,
            data: tag
        });

    } catch (error) {
        return await res.status(400).json({ error: error.message, data: null});
    }
}

module.exports = alterarTag;