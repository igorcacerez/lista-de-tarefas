const TagService = require('../../services/tag.service');
const TarefaService = require('../../services/tarefa.service');
const {validarPermissaoUsuario} = require("../../utils/permissao");

/**
 * Adiciona uma vinculação entre uma tag e uma tarefa.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const adicionarTagTarefa = async (req, res) => {
    const usuario = req.userLogin;
    const { tarefa_id, tag_id } = req.params;

    try {
        const tarefa = await TarefaService.getTarefaPorId(tarefa_id, "*");
        const tag = await TagService.buscarTagPorId(tag_id, "*");

        // Validações de permissão
        validarPermissaoUsuario(tarefa, usuario, "Tarefa não encontrada.")
        validarPermissaoUsuario(tag, usuario, "Tag não encontrada.")

        // Adicionando a tag na tarefa
        await tarefa.addTag(tag);

        // Busca a tarefa atualizada
        const tarefaAtualizada = await TarefaService.getTarefaPorId(tarefa_id);

        return res.status(200).json({
            error: false,
            data: tarefaAtualizada
        });

    } catch (e) {
        return res.status(400).json({
            error: e.message,
            data: null
        });
    }
}

module.exports = adicionarTagTarefa;