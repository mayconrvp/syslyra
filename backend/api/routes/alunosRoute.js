const { Router } = require('express');
const AlunoController = require('../controllers/AlunoController');

const router = Router()
router
 .get('/alunos', AlunoController.listarAlunos)
 .get('/alunos/:id', AlunoController.listarAlunoPorId)
 .post('/alunos', AlunoController.criarAluno)
 .put('/alunos/:id', AlunoController.atualizarAluno)
 .delete('/alunos/:id', AlunoController.excluirAluno)
module.exports = router