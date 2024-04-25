require('../models/Usuario.js');
require('../models/Tag.js');
require('../models/Tarefa.js');

const sequelize = require('../models/index.js');

// Cria as tabelas no banco de dados
sequelize.sync({ force: false })
    .then(() => {
        console.log('Todas as tabelas foram criadas com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao criar tabelas:', error);
    });