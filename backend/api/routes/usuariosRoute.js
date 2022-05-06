const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = Router()
router
 .get('/usuarios', UsuarioController.listarUsuarios)
 .get('/usuarios/:id', UsuarioController.listarUsuarioPorId)
 .post('/usuarios', UsuarioController.criarUsuario)
 .put('/usuarios/:id', UsuarioController.atualizarUsuario)
 .delete('/usuarios/:id', UsuarioController.excluirUsuario)
module.exports = router