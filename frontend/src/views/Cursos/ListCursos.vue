<template>
  <v-container>
    <div class="topo my-5 ml-3">
      <h2>Cadastro de Cursos</h2>

      <div>
        <router-link :to="{ name: 'CadCurso', path: '/cursos' }">
          <v-btn elevation="2" color="success" class="btn">Novo</v-btn>
        </router-link>
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :items="cursos"
      :items-per-page="20"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon color="primary" class="mr-2" @click="editItem(item)"
          >mdi-pencil</v-icon
        >
        <v-icon color="error" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Id", value: "id", sortable: true },
        { text: "Nome", value: "nome", sortable: true },
        { text: "Carga Horária (h)", value: "cargaHoraria" },
        { text: "Nível", value: "nivel" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      cursos: [],
    };
  },
  created() {
    this.getListagem();
  },
  methods: {
    getListagem() {
      this.$http.get("/cursos").then((response) => {
        this.cursos = response.data;
      });
      console.log(this.cursos);
    },
    editItem(curso) {
      this.$router.push(`CadCursos/${curso.id}`);
    },
    deleteItem(curso) {
      if (confirm("Confirma exclusão?")) {
        this.$http.delete(`cursos/${curso.id}`).then(
          () => {
            let indice = this.cursos.indexOf(curso);
            this.cursos.splice(indice, 1);
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
