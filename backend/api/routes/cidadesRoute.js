const { Router } = require('express');
const CidadeController = require('../controllers/CidadeController');

const router = Router()
router
 .get('/cidades', CidadeController.listarCidades)
 .get('/cidades/:id', CidadeController.listarCidadePorId)
 .post('/cidades', CidadeController.criarCidade)
 .put('/cidades/:id', CidadeController.atualizarCidade)
 .delete('/cidades/:id', CidadeController.excluirCidade)
module.exports = router