const TarefaService = require('../../services/tarefa.service');
const {validarData, addTempoDeDuracao, getLocalTimestamp} = require("../../utils/dates");

/**
 * Valida se os campos obrigatórios da tarefa foram preenchidos.
 * Valida se a data de início é válida e se é maior que a data atual.
 * Valida se a duração é um número e é maior que zero.
 * @param {Object} obj
 */
const validarCampos = (obj) => {
    const validarCampo = (campo, mensagem) => {
        if (!campo) throw new Error(mensagem);
    }

    validarCampo(obj.titulo, 'O título é obrigatório.');
    validarCampo(obj.descricao, 'A descrição é obrigatória.');
    validarCampo(obj.data_inicio, 'A data de início é obrigatória.');
    validarCampo(obj.duracao, 'A duração é obrigatória.');

    // Valida a data de início
    if (!validarData(obj.data_inicio)) throw new Error('A data de início é inválida.');

    // Valida se a data e hora de início é maior que a data atual
    if (new Date(obj.data_inicio).getTime() < getLocalTimestamp()) {
        throw new Error('A data de início deve ser maior que a data atual.');
    }

    // Valida a duração
    if (isNaN(obj.duracao)) throw new Error('A duração deve ser um número.');
    if (obj.duracao <= 0) throw new Error('A duração deve ser maior que zero.');
}

/**
 * Valida se as tags são um array e se há pelo menos uma tag.
 * Valida se todas as tags são um número.
 * @param {Array} tags
 */
const validarTags = (tags) => {
    if (!Array.isArray(tags)) throw new Error('As tags devem ser um array.');

    // Verifica se todas as tags são um numero
    tags.forEach(tag => {
        if (isNaN(tag)) throw new Error('Nas tags, deve haver apenas números (identificador).');
    });
}

/**
 * Insere uma tarefa no banco de dados
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const inserirTarefa = async (req, res) => {
    const { tarefa, tags } = req.body;
    const usuario = req.userLogin;

    try {
        let salva = {}

        // Validações
        validarCampos(tarefa);
        if (tags) validarTags(tags);

        // Adiciona itens ao objeto a ser salvo
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