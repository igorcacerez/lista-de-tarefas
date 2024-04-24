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
        return await res.status(403).json({ error: true, msg: 'Token não informado' });
    }

    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    bearerToken = bearer[1];

    // Verify not token bearer
    if (!bearerToken) {
        return await res.status(403).json({ error: true, msg: 'Token não informado' })
    }

    // Verifica se o token é válido e retorna o usuário
    TokenAdapter.verifyToken(bearerToken, async function (err, decoded) {
        if (!decoded || err) {
            return await res.status(403).json({ error: true, msg: 'Token inválido' })
        }

        req.userLogin = decoded.usuario;
        req.token = bearerToken;
        next()
    });
}