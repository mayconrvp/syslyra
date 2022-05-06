const { Router } = require('express');
const FuncionarioController = require('../controllers/FuncionarioController');

const router = Router()
router
 .get('/funcionarios', FuncionarioController.listarFuncionarios)
 .get('/funcionarios/:id', FuncionarioController.listarFuncionarioPorId)
 .post('/funcionarios', FuncionarioController.criarFuncionario)
 .put('/funcionarios/:id', FuncionarioController.atualizarFuncionario)
 .delete('/funcionarios/:id', FuncionarioController.excluirFuncionario)
module.exports = router