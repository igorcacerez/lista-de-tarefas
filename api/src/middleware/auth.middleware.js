const TokenAdapter = require('../adapters/token');

/**
 * Método para validar o login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Promise} Promise
 * @throws {Error} Token não informado
 * @throws {Error} Token inválido
 */
exports.validaLogin = async (req, res, next) => {

    let bearerToken = "";

    // Verify if not information token
    if (!req.headers?.authorization) {
        // throw Error("Token não informado");
        return await res.status(403).json({ error: 'Token não informado', data: null});
    }

    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    bearerToken = bearer[1];

    // Verify not token bearer
    if (!bearerToken) {
        return await res.status(403).json({ error: 'Token não informado', data: null })
    }

    // Verifica se é o modo de teste
    if (process.env.MOD_TEST && bearerHeader === process.env.TOKEN_TEST) {
        req.userLogin = {
            id: 1,
            email: 'teste@gmail.com',
            nome: 'Teste'
        }

        req.token = bearerToken;
        next()
        return;
    }

    // Verifica se o token é válido e retorna o usuário
    TokenAdapter.verifyToken(bearerToken, async function (err, decoded) {
        if (!decoded || err) {
            return await res.status(403).json({ error: 'Token inválido', data: null })
        }

        req.userLogin = decoded;
        req.token = bearerToken;
        next()
    });
}