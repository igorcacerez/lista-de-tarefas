const Sequelize = require('sequelize');
const db = require('./index.js');
const Usuario = require('./Usuario.js');
const Categoria = require('./Categoria.js');
const Capitulo = require('./Capitulo.js');
const Comentario = require('./Comentario.js');

const Livro = db.define('livro', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    tags : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    foto_capa: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    capitulos_gratis: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    publicado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    valor: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true, 
        defaultValue: 0
    }, 
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
    }    
});

// Realiza a vinculação entre as tabelas
Livro.belongsTo(Usuario, {foreignKey: 'usuario_id', as: 'autor'});
Livro.belongsTo(Categoria, {foreignKey: 'categoria_id', as: 'categoria'});
Livro.belongsTo(Categoria, {foreignKey: 'subcategoria_id', as: 'subcategoria', allowNull: true});

Livro.hasMany(Capitulo, {
    foreignKey: 'livro_id',
    as: 'capitulos'
});

Livro.hasMany(Comentario, {
    foreignKey: 'livro_id',
    as: 'comentarios'
});

// Realiza a vinculação entre as tabelas
Capitulo.belongsTo(Livro, {foreignKey: 'livro_id', as: 'livro'});
Comentario.belongsTo(Livro, {foreignKey: 'livro_id', as: 'livro', allowNull: false});

// Cria a tabela caso ela não exista
Livro.sync({force: false}).then(() => {
    console.log('Tabela Livro criada com sucesso!');
});


module.exports = Livro;
