const { Router } = require('express');
const CursoController = require('../controllers/CursoController');

const router = Router()
router
 .get('/cursos', CursoController.listarCursos)
 .get('/cursos/:id', CursoController.listarCursoPorId)
 .post('/cursos', CursoController.criarCurso)
 .put('/cursos/:id', CursoController.atualizarCurso)
 .delete('/cursos/:id', CursoController.excluirCurso)
module.exports = router