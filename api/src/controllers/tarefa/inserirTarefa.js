const TarefaService = require('../../services/tarefa.service');
const {validarData, addTempoDeDuracao} = require("../../utils/dates");

const validarCampo = (campo, mensagem) => {
    if (!campo) throw new Error(mensagem);
}

const inserirTarefa = async (req, res) => {
    const { tarefa, tags } = req.body;
    const usuario = req.userLogin;

    try {
        let salva = {}

        // Validações
        validarCampo(tarefa.titulo, 'O título é obrigatório.');
        validarCampo(tarefa.descricao, 'A descrição é obrigatório.');
        validarCampo(tarefa.data_inicio, 'A data de início é obrigatório.');
        validarCampo(tarefa.duracao, 'A duração é obrigatório.');

        if (!validarData(tarefa.data_inicio)) throw new Error('A data de início é inválida.');

        // Valida as tags
        if (tags) {
            if (!Array.isArray(tags)) throw new Error('As tags devem ser um array.');
            if (tags.length === 0) throw new Error('Deve haver pelo menos uma tag.');
        }

        // Adiciona itens ao objeto salva
        salva.titulo = tarefa.titulo;
        salva.descricao = tarefa.descricao;
        salva.data_inicio = tarefa.data_inicio;

        // Adiciona a duração à data de início
        tarefa.data_fim = addTempoDeDuracao(tarefa.data_inicio, tarefa.duracao);

        // Insere a tarefa no banco de dados
        const novaTarefa = await TarefaService.inserirTarefa(tarefa, usuario, tags);

        return res.status(201).json({
            error: false,
            data: novaTarefa
        });

    } catch (e) {
        return res.status(400).json({
            error: e.message,
            data: null
        });
    }
}

module.exports = inserirTarefa;