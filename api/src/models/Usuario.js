const Sequelize = require('sequelize');
const db = require('./index.js');

const Usuario = db.define('usuario', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    email_verificado: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});


module.exports = Usuario;
