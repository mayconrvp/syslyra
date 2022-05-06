const { Router } = require('express');
const ResponsavelController = require('../controllers/ResponsavelController');

const router = Router()
router
 .get('/responsaveis', ResponsavelController.listarResponsaveis)
 .get('/responsaveis/:id', ResponsavelController.listarResponsavelPorId)
 .post('/responsaveis', ResponsavelController.criarResponsavel)
 .put('/responsaveis/:id', ResponsavelController.atualizarResponsavel)
 .delete('/responsaveis/:id', ResponsavelController.excluirResponsavel)
module.exports = router