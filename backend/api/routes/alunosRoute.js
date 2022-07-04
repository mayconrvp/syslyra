const { Router } = require('express');
const AlunoController = require('../controllers/AlunoController');
const AuthMiddleware = require('../middlewares/authMiddleware')


const router = Router()
router
 .get('/alunos', AuthMiddleware, AlunoController.listarAlunos)
 .get('/alunos/:id', AlunoController.listarAlunoPorId)
 .post('/alunos', AlunoController.criarAluno)
 .put('/alunos/:id', AlunoController.atualizarAluno)
 .delete('/alunos/:id', AlunoController.excluirAluno)
 .get('/alunos/:alunoId/matricula/:matriculaId', AlunoController.listarUmaMatricula)
 .get('/alunos/:alunoId/matricula/', AlunoController.listarMatriculasDeAluno)
 .post('/alunos/:alunoId/matricula', AlunoController.criarMatricula)
 .put('/alunos/:alunoId/matricula/:matriculaId', AlunoController.atualizarMatricula)
 .delete('/alunos/:alunoId/matricula/:matriculaId', AlunoController.excluirMatricula)
 .get('/alunos/matricula/turma/:turmaId', AlunoController.listarMatriculasPorTurma)
 

module.exports = router