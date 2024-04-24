const Capitulo = require("../../models/Capitulo")

/**
 * Método responsável por retornar os dados de um capítulo específico.
 * @param id - ID do capítulo
 * @returns {Promise<Model<any, TModelAttributes>>} - Promise com o capítulo
 */
const getCapitulo = async (id) => {
    let capitulo = await Capitulo.findByPk(id);

    // Verifica se o capítulo não existe
    if (!capitulo) throw new Error("Capítulo não encontrado.");

    return capitulo;
}

module.exports = getCapitulo;