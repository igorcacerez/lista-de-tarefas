const Sequelize = require('sequelize');

const banco = process.env.MOD_TEST ? './database_test.sqlite' : './database.sqlite';

// Conexão com o banco de dados
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: banco
})
 
module.exports = sequelize;