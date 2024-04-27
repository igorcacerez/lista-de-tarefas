const TarefaService = require('../../services/tarefa.service');
const {getDiferencaEmHoras, addTempoDeDuracao} = require("../../utils/dates");
const {validarPermissaoUsuario} = require("../../utils/permissao");

/**
 * Retorna as alterações a serem feitas na tarefa.
 * @param {Object} dados
 * @returns {{}}
 */
const getAlteracoes = (dados = {}) => {
    let alteracoes = {};
    if (dados?.titulo) alteracoes.titulo = dados.titulo;
    if (dados?.descricao) alteracoes.descricao = dados.descricao;
    if (dados?.data_inicio) alteracoes.data_inicio = dados.data_inicio;
    if (dados?.duracao) alteracoes.duracao = dados.duracao;

    // Verifica se houve alterações
    if (Object.keys(alteracoes).length === 0) {
        throw new Error('Nenhuma alteração foi informada.');
    }

    return alteracoes;
}


/**
 * Retorna a data de fim da tarefa.
 * Verifica se a data de início ou a duração foram alteradas.
 * Caso não tenha sido alterado, retorna a data de fim com base na tarefa atual.
 * @param dados
 * @param tarefa
 * @returns {{defaultValue: null, allowNull: boolean, type: DateDataTypeConstructor}|Date|*|Date}
 */
const getDataFim = (dados, tarefa) => {
    if (!dados.data_inicio && !dados.durcao) return tarefa.data_fim;

    const dataInicio = dados.data_inicio || tarefa.data_inicio;
    const duracao = dados.duracao || getDiferencaEmHoras(tarefa.data_inicio, tarefa.data_fim);

    return addTempoDeDuracao(dataInicio, duracao);
}


/**
 * Método responsável por alterar uma tarefa.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const alterarTarefa = async (req, res) => {
    const usuario = req.userLogin;
    const { id } = req.params;
    const dados = req.body;
    let alteracoes = {};

    try {
        // Busca a tarefa
        const tarefaBusca = await TarefaService.getTarefaPorId(id, "*")

        // Validações de permissão
        validarPermissaoUsuario(tarefaBusca, usuario);

        // Retorna as alterações
        alteracoes = getAlteracoes(dados);

        // Adiciona a data de fim
        alteracoes.data_fim = getDataFim(dados, tarefaBusca);

        // Remove a duracao
        delete alteracoes.duracao;

        // Altera a tarefa
        const tarefa = await TarefaService.alterarTarefa(id, alteracoes)

        return res.status(200).json({
            error: false,
            data: tarefa
        });

    } catch (e) {
        return res.status(400).json({
            error: e.message,
            data: null
        });
    }
}

module.exports = alterarTarefa;