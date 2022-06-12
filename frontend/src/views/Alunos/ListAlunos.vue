<template>
  <v-container>
    <div class="topo my-5 ml-3">
      <h2>Cadastro de Alunos</h2>

      <div>
        <router-link :to="{ name: 'CadAluno', path: '/alunos' }">
          <v-btn elevation="2" color="success" class="btn">Novo</v-btn>
        </router-link>
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :items="alunos"
      :items-per-page="20"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon color="primary" class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="error" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
//import CategoriaService from "../services/AlunoService";
//import AlunoService from "../../services/AlunoService";

export default {
  data() {
    return {
      nome: "",
      alunos: [],
      // categoriaEdit: new Categoria(),
      headers: [
        { text: "Id", value: "id", sortable: true },
        { text: "Nome", value: "nome", sortable: true },
        { text: "Telefone", value: "telefone" },
        { text: "Email", value: "email" },
        { text: "Turno", value: "turno" },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.getListagem();
  },
  methods: {
    getListagem() {
      this.$http.get("alunos").then((response) => {
        this.alunos = response.data;
      });
    },
    editItem(aluno) {
      this.$router.push("CadAlunos/" + aluno.id);
    },
    deleteItem(aluno) {
      console.log(aluno);
      if (confirm("Confirma exclusão?")) {
        this.$http.delete(`alunos/${aluno.id}`).then(
          () => {
            let indice = this.alunos.indexOf(aluno);
            this.alunos.splice(indice, 1);
            alert(`Deleção efetuada com sucesso`);
          },
          (err) => {
            alert("Não foi possivel efetuar a deleção. Erro: " + err);
            console.log(err);
          }
        );
      }
    },
  },
};
</script>

<style>
.controle {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1.2em;
  margin-bottom: 20px;
  gap: 10px;
}

a {
  text-decoration: none;
}

.topo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
