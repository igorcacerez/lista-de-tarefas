// Descrição: arquivo responsável pelas 'Regras de Negócio' da classe 'Usuario'.
// Importa os métodos
const getTodosOsUsuarios = require('./usuario/getTodosOsUsuarios');
const getUsuarioPorId = require('./usuario/getUsuarioPorId');
const getUsuarioPorEmailSenha = require('./usuario/getUsuarioPorEmailSenha');
const inserirUsuario = require('./usuario/inserirUsuario');
const getUsuarioTokenEmail = require('./usuario/getUsuarioTokenEmail');
const alterarUsuario = require('./usuario/alterarUsuario');

// Exporta os métodos
module.exports = {
    getTodosOsUsuarios,
    getUsuarioPorId,
    getUsuarioPorEmailSenha,
    inserirUsuario,
    getUsuarioTokenEmail,
    alterarUsuario
};