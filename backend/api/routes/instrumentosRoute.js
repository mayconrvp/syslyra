const { Router } = require('express');
const InstrumentoController = require('../controllers/InstrumentoController');

const router = Router()
router
 .get('/instrumentos', InstrumentoController.listarInstrumentos)
 .get('/instrumentos/:id', InstrumentoController.listarInstrumentoPorId)
 .post('/instrumentos', InstrumentoController.criarInstrumento)
 .put('/instrumentos/:id', InstrumentoController.atualizarInstrumento)
 .delete('/instrumentos/:id', InstrumentoController.excluirInstrumento)
module.exports = router