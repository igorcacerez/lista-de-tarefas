const Livro = require("../../models/Livro")

/**
 * Método responsável por buscar os detalhes de um livro,
 * incluindo os relacionamentos. 
 * @param {number} id  - Id do livro
 * @param {boolean} full - Se true, inclui os relacionamentos
 * @returns {Promise<Livro>} - Retorna um objeto do tipo Livro
 */
const getDetailsLivro = async (id, full = true) => {

    const includes = {}

    // Se full for true, inclui os relacionamentos
    if (full) {
        includes.includes = [
            {
                association: 'categoria',
                attributes: ["id", "nome"]
            },
            {
                association: "subcategoria",
                attributes: ["id", "nome"]
            },
            {
                association: "autor",
                attributes: ["id", "nome", "sobrenome", "nome_exibicao", "foto_perfil"]
            },
            {
                association: "capitulos",
                attributes: ["id", "titulo", "numero"],
                order: [["numero", "ASC"]]
            },
            {
                association: "comentarios",
                include: [
                    {
                        association: "usuario",
                        attributes: ["id", "nome", "sobrenome", "nome_exibicao", "foto_perfil"]
                    }
                ]
            }
        ]
    }

    // Busca o livro pelo id
    return await Livro.findByPk(id, includes);
}

module.exports = getDetailsLivro;