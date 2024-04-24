const LivroService = require('../../services/livro.service');

const listarLivros = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const busca = {titulo, categoria, subcategoria } = req.query;

        const livros = await LivroService.getAllLivros(page, limit, busca);

        res.status(200).json({
            error: false,
            data: livros
        })

    } catch (error) {
        res.status(400).json({
            error: error.message,
            data: null
        }) 
    }
}

module.exports = listarLivros;