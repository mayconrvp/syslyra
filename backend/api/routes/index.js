const bodyParser = require('body-parser');

const cursos = require('./cursosRoute');
const cidades = require('./cidadesRoute');
const avaliacoes = require('./avaliacoesRoute');
const instrumentos = require('./instrumentosRoute');
const funcionarios = require('./funcionariosRoute');
const usuarios = require('./usuariosRoute');
const escolas = require('./escolasRoute');
const responsaveis = require('./responsaveisRoute');
const enderecos = require('./enderecosRoute');
const turmas = require('./turmasRoute');
const alunos = require('./alunosRoute');
const matriculas = require('./matriculasRoute');
const emprestimos = require('./emprestimosRoute');


module.exports = app => {
  app.use(
    bodyParser.json(),
    cursos,
    cidades,
    avaliacoes,
    instrumentos,
    funcionarios,
    usuarios,
    escolas,
    responsaveis,
    enderecos,
    turmas,
    alunos,
    emprestimos,
    matriculas
  )
}