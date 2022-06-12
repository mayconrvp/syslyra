const { Router } = require('express');
const AulasAlunosController = require('../controllers/AulasAlunosController');

const router = Router()
router
 .get('/aulas/:aulaId/alunos/:alunoId', AulasAlunosController.listarAulaAluno)
 .post('/aulas/:aulaId/alunos/:alunoId', AulasAlunosController.criarAulaAluno)
 .put('/aulas/:aulaId/alunos/:alunoId', AulasAlunosController.atualizarAulaAluno)
 .delete('/aulas/:aulaId/alunos/:alunoId', AulasAlunosController.excluirAulaAluno)
module.exports = router