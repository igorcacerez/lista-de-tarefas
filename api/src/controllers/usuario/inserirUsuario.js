const UsuarioService = require('../../services/usuario.service');

/**
 * Método para inserir um usuário
 * @param {*} req
 * @param {*} res
 * @returns
 * @throws {Error} E-mail já cadastrado
 * @throws {Error} O nome é obrigatório
 * @throws {Error} O e-mail é obrigatório
 * @throws {Error} A senha é obrigatório
 * @throws {Error} A confirmação da senha é obrigatório
 * @throws {Error} As senhas devem ser idênticas
 */
const inserirUsuario = async (req, res) => {
    const { nome, email, senha, confsenha } = req.body;

    try {
        // Verifica se informou os dados obrigatórios 
        if(!nome) throw new Error("O nome é obrigatório.")
        if(!email) throw new Error("O e-mail é obrigatório.")
        if(!senha) throw new Error("A senha é obrigatório.")
        if(!confsenha) throw new Error("A confirmação da senha é obrigatório")
        if(confsenha !== senha) throw new Error("As senhas devem ser idênticas.")

        // Cria um objeto de inserção 
        const save = {nome, email, senha}

        // Insere o usuário
        await UsuarioService.inserirUsuario(save);

        // Retorna o usuário
        res.status(201).json({
            error: false,
            data: null
        });

    } catch (error) {
        res.status(400).json({
            error: error.message,
            data: null
        });
    }
};

module.exports = inserirUsuario;