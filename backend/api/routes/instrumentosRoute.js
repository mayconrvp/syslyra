const { Router } = require('express');
const InstrumentoController = require('../controllers/InstrumentoController');

const router = Router()
router
 .get('/cursos', InstrumentoController.listarInstrumentos)
 .get('/cursos/:id', InstrumentoController.listarInstrumentoPorId)
 .post('/cursos', InstrumentoController.criarInstrumento)
 .put('/cursos/:id', InstrumentoController.atualizarInstrumento)
 .delete('/cursos/:id', InstrumentoController.excluirInstrumento)
module.exports = router