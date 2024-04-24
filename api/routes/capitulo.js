const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware');

// Cria a rota
const router = express.Router();

// Importa o controller
const Capitulo = require('../controllers/capitulo.controller');

// Configuração do multer para manter os arquivos na memória como Buffer;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rotas da API
router.get("/:id", Capitulo.detalhesCapitulo)