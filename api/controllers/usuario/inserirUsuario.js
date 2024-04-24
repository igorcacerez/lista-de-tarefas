const UsuarioService = require('../../services/usuario.service');

/**
 * Método para inserir um usuário
 * @param {*} req
 * @param {*} res
 * @returns
 * @throws {Error} E-mail já cadastrado
 */
const inserirUsuario = async (req, res) => {
    const { nome, sobrenome, data_nascimento, nome_exibicao, email, senha, confsenha } = req.body;

    try {
        // Verifica se informou os dados obrigatórios 
        if(!nome) throw new Error("O nome é obrigatório.")
        if(!sobrenome) throw new Error("O sobrenome é obrigatório.")
        if(!email) throw new Error("O e-mail é obrigatório.")
        if(!data_nascimento) throw new Error("A data de nascimento é obrigatória.")
        if(!senha) throw new Error("A senha é obrigatório.")
        if(!confsenha) throw new Error("A confirmação da senha é obrigatório")
        if(confsenha !== senha) throw new Error("As senhas devem ser idênticas.")

        // Cria um objeto de inserção 
        const save = {nome, sobrenome, data_nascimento, email, senha}

        // Verifica se informou um nome_exibicao, caso tenha informado adicione para inserção
        if(nome_exibicao) save.nome_exibicao = nome_exibicao

        // Insere o usuário
        const user = await UsuarioService.inserirUsuario(save);

        // Retorna o usuário
        res.status(201).json({
            error: false,
            data: {
                usuario: user
            }
        });

    } catch (error) {
        res.status(400).json({
            error: error.message,
            data: null
        });
    }
};

module.exports = inserirUsuario;