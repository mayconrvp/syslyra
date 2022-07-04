const { Router } = require('express');
const AulaController = require('../controllers/AulaController');

const router = Router()
router
 .get('/aulas', AulaController.listarAulas)
 //.get('/aulas/:id', AulaController.listarAulaPorId)
 
 .put('/aulas/:aulaId/turma/:turmaId', AulaController.atualizarAula)
 .delete('/aulas/:aulaId/turma/:turmaId', AulaController.excluirAula)
 
 .get('/aulas/turma/:turmaId', AulaController.listarAulasPorTurma)
 .get('/aulas/:aulaId/turma/:turmaId', AulaController.listarAulaPorTurma)
 .post('/aulas/turma/:turmaId', AulaController.criarAulaTurma)


 
module.exports = router