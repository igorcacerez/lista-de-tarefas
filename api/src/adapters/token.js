const jwt = require('jsonwebtoken');

/**
 * Método para criar um token
 * @param {*} obj
 * @param {string|null} secret
 * @param {string|null} expires
 * @returns {string} Token
 */
exports.createToken = async (obj, secret = null, expires = null) => {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        throw new Error('Deve ser informado um OBJ para gerar o token.');
    }

    try {
        // Cria o token
        const token = await jwt.sign(obj,
            secret ? secret : process.env.JWT_SECRET,
            { expiresIn: expires ? expires : '1d'}
        );

        return token;
    } catch (error) {
        throw new Error('Erro ao gerar o token.' + error);
    }
};


/**
 * Método para verificar um token
 * @param {*} token
 * @returns {Promise} Promise
 */ 
exports.verifyToken = async (token, func) => {
    return jwt.verify(token, process.env.JWT_SECRET, func);
};