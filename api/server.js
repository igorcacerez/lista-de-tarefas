const http = require('http');
const app = require('./app');
const fs = require('fs');

// Verifica se a variável de ambiente MOD_TESTE está setada
const banco = process.env.MOD_TEST ? './database_test.sqlite' : './database.sqlite';

// Verifica se não existe um banco criado
if (!fs.existsSync(banco)) {
    require("./src/config/migrate"); // cria todas as tabelas do banco
}

const port = 8888 || 3000;
const server = http.createServer(app);

console.log(`started api on port ${port}`);


server.listen(port);