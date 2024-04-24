// Description: Arquivo responsável pelas rotas da API relacionado a classe 'Usuario'.
// Importa os métodos
const login = require('./usuario/login');
const inserirUsuario = require('./usuario/inserirUsuario');
const listarUsuarios = require('./usuario/listarUsuarios');
const listarUsuarioId = require('./usuario/listarUsuarioId');
const validarEmail = require('./usuario/validarEmail');
const alterarUsuario = require('./usuario/alterarUsuario');
const alterarPerfilUsuario = require('./usuario/alterarPerfilUsuario');
const alterarCapaUsuario = require('./usuario/alterarCapaUsuario');

// Exporta os métodos
module.exports = {
    login,
    inserirUsuario,
    listarUsuarios,
    listarUsuarioId,
    validarEmail,
    alterarUsuario,
    alterarPerfilUsuario,
    alterarCapaUsuario
};

