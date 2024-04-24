const Sequelize = require('sequelize');
const db = require('./index.js');

const Categoria = db.define('categoria', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    foto_capa: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

Categoria.belongsTo(Categoria, {foreignKey: 'categoria_pai', allowNull: true});

// Cria a tabela caso ela não exista
Categoria.sync({force: false}).then(() => {
    console.log('Tabela Categoria criada com sucesso!');
});

module.exports = Categoria;