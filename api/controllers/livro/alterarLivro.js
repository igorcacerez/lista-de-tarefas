const LivroService = require('../../services/livro.service');

/**
 * Método para alterar as informações de cadastro de um livro
 * @param {Object} req - Requisição recebida
 * @param {Object} res - Resposta a ser enviada
 * @returns {Promise<*>} - Retorna o livro alterado
 */
const alterarLivro = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = req.userLogin;
        const livro = req.body;

        // Busca o livro pelo id
        const livroBuscado = await LivroService.getDetailsLivro(id, false);
        
        if (!livroBuscado) throw new Error('Livro não encontrado');
        if (livroBuscado.usuario_id != usuario.id) {
            throw new Error('Você não tem permissão para alterar este livro');
        }

        // Altera o livro
        const result = await LivroService.alterarLivro(livro, id);
        if (!result) throw new Error('Ocorreu um erro ao alterar o livro');

        // Busca o livro alterado
        const livroAlterado = await LivroService.getDetailsLivro(id, false);

        // Informa o resultado
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

module.exports = alterarLivro;