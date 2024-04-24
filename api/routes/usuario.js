const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware');

// Cria a rota
const router = express.Router();

// Importa o controller
const Usuario = require('../controllers/usuario.controller');

// Configuração do multer para manter os arquivos na memória como Buffer;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rotas de usuário
router.get('/', Usuario.listarUsuarios);
router.get('/:id', Usuario.listarUsuarioId);
router.post('/login', Usuario.login);
router.post('/inserir', Usuario.inserirUsuario);
router.post('/validar-email', Usuario.validarEmail);
router.put('/alterar/perfil', authMiddleware.validaLogin, upload.single('imagem'), Usuario.alterarPerfilUsuario);
router.put('/alterar/capa', authMiddleware.validaLogin, upload.single('imagem'), Usuario.alterarCapaUsuario);
router.put('/alterar', authMiddleware.validaLogin, Usuario.alterarUsuario);

module.exports = router;