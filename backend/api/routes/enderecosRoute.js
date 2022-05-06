const { Router } = require('express');
const EnderecoController = require('../controllers/EnderecoController');

const router = Router()
router
 .get('/enderecos', EnderecoController.listarEnderecos)
 .get('/enderecos/:id', EnderecoController.listarEnderecoPorId)
 .post('/enderecos', EnderecoController.criarEndereco)
 .put('/enderecos/:id', EnderecoController.atualizarEndereco)
 .delete('/enderecos/:id', EnderecoController.excluirEndereco)
module.exports = router