const { Router } = require('express');
const AulaController = require('../controllers/AulaController');

const router = Router()
router
 .get('/aulas', AulaController.listarAulas)
 .get('/aulas/:id', AulaController.listarAulaPorId)
 .post('/aulas', AulaController.criarAula)
 .put('/aulas/:id', AulaController.atualizarAula)
 .delete('/aulas/:id', AulaController.excluirAula)
 
module.exports = router