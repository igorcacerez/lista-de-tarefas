const UsuarioService = require('../../services/usuario.service');
const TokenAdapter = require('../../adapters/token');

/**
 * Método para realizar o login do usuário
 * @param {*} req
 * @param {*} res
 * @returns
 * @throws {Error} E-mail ou senha informados estão incorretos.
 * @throws {Error} Usuário não encontrado
 */
const login = async (req, res) => {
    try {
        // Pega os dados do header authorization
        const auth = req.headers.authorization;

        // Verifica se o header foi enviado
        if (!auth) {
            res.status(400).json({
                error: "E-mail e senha são obrigatórios.",
                data: null
            });
            return;
        }

        // Decodifica o header
        const credentials = Buffer.from(auth.replace('Basic ', ''), 'base64').toString('utf-8');

        // Separa o email e senha
        const [email, senha] = credentials.split(':');

        // Busca o usuário pelo email e senha
        const usuario = await UsuarioService.getUsuarioPorEmailSenha(email, senha);

        // Cria o token jwt
        const token = await TokenAdapter.createToken({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            email_verificado: usuario.email_verificado,
        })


        // Retorna o token
        res.status(200).json({
            error: false,
            data: {
                token: token
            }
        });

    } catch (error) {
        res.status(400).json({
            error: error.message,
            data: null
        });
    }
};

module.exports = login;