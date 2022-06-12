<template>
  <v-container>
    <div class="topo my-5 ml-3">
      <h2>Cadastro de Instrumentos</h2>

      <div>
        <router-link :to="{ name: 'CadInstrumento', path: '/instrumentos' }">
          <v-btn elevation="2" color="success" class="btn">Novo</v-btn>
        </router-link>
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :items="instrumentos"
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
        { text: "Descrição", value: "descricao", sortable: true },
        { text: "Modelo", value: "modelo" },
        { text: "Marca", value: "marca" },
        { text: "Numero de Série", value: "numeroSerie" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      instrumentos: [],
    };
  },
  created() {
    this.getListagem();
  },
  methods: {
    getListagem() {
      this.$http.get("/instrumentos").then((response) => {
        this.instrumentos = response.data;
        console.log(this.instrumentos);
      });
      console.log(this.instrumentos);
    },
    editItem(instrumento) {
      this.$router.push(`CadInstrumentos/${instrumento.id}`);
    },
    deleteItem(instrumento) {
      if (confirm("Confirma exclusão?")) {
        this.$http.delete(`instrumentos/${instrumento.id}`).then(
          () => {
            let indice = this.instrumentos.indexOf(instrumento);
            this.instrumentos.splice(indice, 1);
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
