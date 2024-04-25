// Description: Arquivo responsável pelas rotas da API relacionado a classe 'Usuario'.
// Importa os métodos
const login = require('./usuario/login');
const inserirUsuario = require('./usuario/inserirUsuario');
const validarEmail = require('./usuario/validarEmail');
const alterarUsuario = require('./usuario/alterarUsuario');

// Exporta os métodos
module.exports = {
    login,
    inserirUsuario,
    validarEmail,
    alterarUsuario
};

