const Sequelize = require('sequelize');
const db = require('./index.js');
const Usuario = require('./Usuario.js');

const Tag = db.define('tag', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cor: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '#000000',
    }
});

// Realiza a vinculação de n:1 com a tabela usuario
Tag.belongsTo(Usuario, {foreignKey: 'usuario_id', as: 'usuario'});


module.exports = Tag;
