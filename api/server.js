const http = require('http');
const app = require('./app');
const fs = require('fs');

// Verifica se não existe um banco criado
if (!fs.existsSync("./database.sqlite")) {
    require("./config/migrate"); // cria todas as tabelas do banco
}

const port = 8888 || 3000;
const server = http.createServer(app);

console.log(`started api on port ${port}`);

server.listen(port);