const { uploadFileAws } = require('../../adapters/aws');
const livroService = require('../../services/livro.service');

const inserirLivro = async (req, res) => {

    const { id } = req.userLogin;
    const path = `usuarios/${id}/capas_livros/`;
    
    try {

        // Verifica se informou os dados obrigatórios
        if(!req.body.titulo) throw new Error("O título é obrigatório.")
        if(!req.body.descricao) throw new Error("A descrição é obrigatória.")
        if(!req.body.categoria_id) throw new Error("A categoria é obrigatória.")
        if(!req.body.subcategoria_id) throw new Error("A subcategoria é obrigatória.")
        if(!req.body.tags) throw new Error("Informe as tags separadas por vírgula.")
        if (!req.file) throw new Error("A capa do livro é obrigatória.")

        // Cria um objeto de inserção
        const save = req.body

        // Verifica se o usuário enviou uma capa para o livro
        save.foto_capa = await uploadFileAws(req.file, path);
        save.usuario_id = id;

        // Insere o livro
        const livro = await livroService.inserirLivro(save);

        // Retorna o livro
        res.status(201).json({
            error: false,
            data: {
                livro
            }
        });

    } catch (error) {
        res.status(400).json({
            error: error.message,
            data: null
        })   
    }
};


module.exports = inserirLivro