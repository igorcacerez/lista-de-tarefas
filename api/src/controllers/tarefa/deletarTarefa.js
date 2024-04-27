const TarefaService = require('../../services/tarefa.service');
const {validarPermissaoUsuario} = require("../../utils/permissao");

/**
 * Método responsável por deletar uma tarefa.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deletarTarefa = async (req, res) => {
    const usuario = req.userLogin;
    const { id } = req.params;

    try {
        // Busca a tarefa
        const tarefa = await TarefaService.getTarefaPorId(id, "*");

        // Validações de permissão
        validarPermissaoUsuario(tarefa, usuario, "Tarefa não encontrada.");

        // Deleta a tarefa
        await TarefaService.deletarTarefa(id);

        return res.status(200).json({
            error: false,
            data: null
        });

    } catch (e) {
        return res.status(400).json({
            error: e.message,
            data: null
        });
    }
}

module.exports = deletarTarefa;