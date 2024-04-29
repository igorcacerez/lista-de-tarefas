const TarefaService = require('../../services/tarefa.service');

const filtrarTarefaData = async (req, res) => {
    const usuario = req.userLogin;
    const { inicio, fim } = req.query;

    try {

        const where = {
            data_inicio: inicio,
            data_fim: fim || new Date().toISOString()
        };

        const tarefas = await TarefaService.getTodasTarefas(usuario.id, where);

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

module.exports = filtrarTarefaData;