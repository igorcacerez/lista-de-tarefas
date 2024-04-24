const LivroService = require('../../services/livro.service');
const { uploadFileAws } = require('../../adapters/aws');

/**
 * Altera a capa do livro
 * @param req - Deve conter o id do livro e a nova capa do livro
 * @param res - Retorna o livro alterado
 * @returns {Promise<*>} - Retorna o livro alterado
 */
const alterarCapaLivro = async (req, res) => {
    const { id } = req.params;
    const file = req.file;

    const path = `usuarios/${req.userLogin}/capas_livros/`;

    try {
        // Verifica se informou a nova capa do livro
        if (!file) throw new Error("A capa do livro é obrigatória.");
    
        // Busca o livro
        const livro = await LivroService.getDetailsLivro(id, false);
        if(!livro) throw new Error("Livro não encontrado.");

        // Verifica se o livro pertence ao usuário
        if(livro.usuario_id !== req.userLogin) throw new Error("Livro não encontrado.");

        // Faz o upload da capa do livro
        const foto_capa = await uploadFileAws(file, path);

        // Altera a capa do livro
        const result = await LivroService.alterarLivro({ foto_capa }, id);
        if (!result) throw new Error('Ocorreu um erro ao alterar a capa do livro');

        // Busca o livro alterado
        const livroAlterado = await LivroService.getDetailsLivro(id, false);

        return await res.status(200).json({
            error: false,
            data: livroAlterado
        });

    } catch (error) {
        return await res.status(400).json({ 
            error: error.message, 
            data: null 
        });
    }
}

module.exports = alterarCapaLivro;