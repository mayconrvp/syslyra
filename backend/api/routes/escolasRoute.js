const { Router } = require('express');
const EscolaController = require('../controllers/EscolaController');

const router = Router()
router
 .get('/escolas', EscolaController.listarEscolas)
 .get('/escolas/:id', EscolaController.listarEscolaPorId)
 .post('/escolas', EscolaController.criarEscola)
 .put('/escolas/:id', EscolaController.atualizarEscola)
 .delete('/escolas/:id', EscolaController.excluirEscola)
module.exports = router