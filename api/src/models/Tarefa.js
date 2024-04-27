const Sequelize = require('sequelize');
const db = require('./index.js');
const Tag = require("./Tag");
const Usuario = require("./Usuario");

const Tarefa = db.define('tarefa', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    data_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    data_fim: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
    }
});

// Realiza a vinculação de n:n
Tarefa.belongsToMany(Tag, { through: 'tarefa_tag' });
Tag.belongsToMany(Tarefa, { through: 'tarefa_tag' });

// Realiza a vinculação de n:1 com a tabela usuario
Tarefa.belongsTo(Usuario, {foreignKey: 'usuario_id', as: 'usuario'});


module.exports = Tarefa;
