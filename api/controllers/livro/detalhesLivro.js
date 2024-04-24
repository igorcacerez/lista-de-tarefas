const LivroService = require('../../services/livro.service');

const detalhesLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await LivroService.getDetailsLivro(id);

        // Verifica se o livro existe
        if(!livro) throw new Error("Livro não encontrado");

        res.status(200).json({
            error: null,
            data: livro
        });

    } catch (error) {
        res.status(400).json({
            error: error.message,
            data: null
        })   
    }
}

module.exports = detalhesLivro;