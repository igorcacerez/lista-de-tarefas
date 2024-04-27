const TarefaService = require('../../services/tarefa.service');

/**
 * Lista todas as tarefas do usuário logado
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const listarTarefas = async (req, res) => {
    const usuario = req.userLogin;

    try {
        const tarefas = await TarefaService.getTodasTarefas(usuario.id)

        return res.status(200).json({
            error: false,
            data: tarefas
        });

    } catch (e) {
        return res.status(400).json({
            error: e.message,
            data: null
        });
    }
}

module.exports = listarTarefas;