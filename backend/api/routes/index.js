const bodyParser = require('body-parser');

const cursos = require('./cursosRoute');

const avaliacoes = require('./avaliacoesRoute');
const instrumentos = require('./instrumentosRoute');
const funcionarios = require('./funcionariosRoute');
const usuarios = require('./usuariosRoute');
const escolas = require('./escolasRoute');
const responsaveis = require('./responsaveisRoute');
const enderecos = require('./enderecosRoute');
const turmas = require('./turmasRoute');
const alunos = require('./alunosRoute');
const emprestimos = require('./emprestimosRoute');
const aulas = require('./aulasRoute')
const aulasAlunos = require('./aulasAlunosRoute')
const estados = require('./estadosRoute')


module.exports = app => {
  app.use(
    bodyParser.json(),
    avaliacoes,
    instrumentos,
    funcionarios,
    usuarios,
    cursos,
    escolas,
    responsaveis,
    enderecos,
    turmas,
    alunos,
    emprestimos,
    aulas,
    aulasAlunos,
    estados
  )
}