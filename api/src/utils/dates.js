/**
 * Função para validar se a data é válida
 * @param {string} data
 * @returns {boolean}
 */
const validarData = (data) => {
    const dataConvertida = new Date(data);
    console.log("data", dataConvertida.toString() !== 'Invalid Date');
    console.log("data c", dataConvertida.toString());
    return dataConvertida.toString() !== 'Invalid Date';
}

/**
 * Função para adicionar uma duração em horas a uma data
 * @param {string} data
 * @param {number} duracao
 * @returns {Date}
 */
const addTempoDeDuracao = (data, duracao) => {
    const dataConvertida = new Date(data);
    const duracaoInt = parseInt(duracao);

    dataConvertida.setHours(dataConvertida.getHours() + duracaoInt);
    return dataConvertida;
}

/**
 * Função para calcular a diferença em horas entre duas datas
 * @param dataInicio
 * @param dataFim
 * @returns {number}
 */
const getDiferencaEmHoras = (dataInicio, dataFim) => {
    // String para data
    const dataInicioConvertida = new Date(dataInicio);
    const dataFimConvertida = new Date(dataFim);

    // Diferença
    const diferenca = dataFim - dataInicio;
    return (diferenca / 1000 / 60 / 60); // ms -> s -> min -> h
}


module.exports = {
    validarData,
    addTempoDeDuracao,
    getDiferencaEmHoras
};
