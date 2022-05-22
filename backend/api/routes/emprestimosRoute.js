const { Router } = require('express');
const EmprestimoController = require('../controllers/EmprestimoController');

const router = Router()
router
 .get('/emprestimos', EmprestimoController.listarEmprestimos)
 .get('/emprestimos/:id', EmprestimoController.listarEmprestimoPorId)
 .post('/emprestimos', EmprestimoController.criarEmprestimo)
 .put('/emprestimos/:id', EmprestimoController.atualizarEmprestimo)
 .delete('/emprestimos/:id', EmprestimoController.excluirEmprestimo)
module.exports = router