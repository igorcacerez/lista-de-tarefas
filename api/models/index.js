const Sequelize = require('sequelize');

// Conexão com o banco de dados
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})
 
module.exports = sequelize;