const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware');

// Cria a rota
const router = express.Router();

// Importa o controller
const Livro = require('../controllers/livro.controller');

// Configuração do multer para manter os arquivos na memória como Buffer;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rotas da API
router.get("/", Livro.listarLivros);
router.get("/:id", Livro.detalhesLivro);
router.post('/inserir', authMiddleware.validaLogin, upload.single('imagem'), Livro.inserirLivro);
router.put('/alterar/:id', authMiddleware.validaLogin, Livro.alterarLivro);
router.put('/capa/:id', authMiddleware.validaLogin, upload.single('imagem'), Livro.alterarCapaLivro);

module.exports = router;