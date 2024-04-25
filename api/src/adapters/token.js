const jwt = require('jsonwebtoken');

/**
 * Método para criar um token
 * @param {*} obj 
 * @returns {string} Token
 */
exports.createToken = async (obj) => {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        throw new Error('Deve ser informado um OBJ para gerar o token.');
    }

    try {
        // Cria o token
        const token = await jwt.sign(obj,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return token;
    } catch (error) {
        throw new Error('Erro ao gerar o token.');
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