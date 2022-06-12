import Vue from 'vue'
import VueRouter from 'vue-router'
import ListAlunos from "../views/Alunos/ListAlunos.vue";
import CadastroAlunos from "../views/Alunos/CadastroAlunos.vue";
import ListCursos from "../views/Cursos/ListCursos.vue";
import CadastroCursos from "../views/Cursos/CadastroCursos.vue";
import ListTurmas from "../views/Turmas/ListTurmas.vue";
import CadastroTurmas from "../views/Turmas/CadastroTurmas.vue";
import ListEscolas from "../views/Escolas/ListEscolas.vue";
import CadastroEscolas from "../views/Escolas/CadastroEscolas.vue";
import ListInstrumentos from "../views/Instrumentos/ListInstrumentos.vue";
import CadastroInstrumentos from "../views/Instrumentos/CadastroInstrumentos.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/alunos",
    name: "Aluno",
    component: ListAlunos,
    menu: true
  },
  {
    path: "/CadAlunos",
    name: "CadAluno",
    component: CadastroAlunos,
    menu: false
  },
  {
    path: "/cadAlunos/:id",
    name: "AlteraAluno",
    component: CadastroAlunos,
    menu: false
  },
  {
    path: "/cursos",
    name: "Curso",
    component: ListCursos,
    menu: true
  },
  {
    path: "/CadCursos",
    name: "CadCurso",
    component: CadastroCursos,
    menu: false
  },
  {
    path: "/cadCursos/:id",
    name: "AlteraCurso",
    component: CadastroCursos,
    menu: false
  },
  {
    path: "/turmas",
    name: "Turma",
    component: ListTurmas,
    menu: true
  },
  {
    path: "/CadTurmas",
    name: "CadTurma",
    component: CadastroTurmas,
    menu: false
  },
  {
    path: "/cadTurmas/:id",
    name: "AlteraTurma",
    component: CadastroTurmas,
    menu: false
  },
  {
    path: "/escolas",
    name: "Escola",
    component: ListEscolas,
    menu: true
  },
  {
    path: "/CadEscolas",
    name: "CadEscola",
    component: CadastroEscolas,
    menu: false
  },
  {
    path: "/cadEscolas/:id",
    name: "AlteraEscola",
    component: CadastroEscolas,
    menu: false
  },
  {
    path: "/instrumentos",
    name: "Instrumento",
    component: ListInstrumentos,
    menu: true
  },
  {
    path: "/CadInstrumentos",
    name: "CadInstrumento",
    component: CadastroInstrumentos,
    menu: false
  },
  {
    path: "/cadInstrumentos/:id",
    name: "AlteraInstrumento",
    component: CadastroInstrumentos,
    menu: false
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
