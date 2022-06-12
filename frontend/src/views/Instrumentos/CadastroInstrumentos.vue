<template>
  <v-container>
    <v-card>
      <v-toolbar color="cyan" dark>
        <v-toolbar-title>Cadastro de Instrumentos</v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-slot:extension> </template>
      </v-toolbar>

      <v-form @submit.prevent="grava()">
        <v-card>
          <v-container>
            <v-text-field
              v-model="descricao"
              :counter="100"
              label="Descrição"
            ></v-text-field>
            <v-text-field
              v-model="modelo"
              :counter="100"
              label="Modelo"
            ></v-text-field>
            <v-text-field
              v-model="marca"
              :counter="100"
              label="Marca"
            ></v-text-field>
            <v-text-field
              v-model="numeroSerie"
              :counter="100"
              label="Numero de Série"
            ></v-text-field>
          </v-container>
        </v-card>

        <v-card>
          <v-container>
            <v-btn
              v-if="this.id"
              class="mr-4"
              primary
              color="success"
              @click="atualizaDadosGerais"
            >
              Atualizar
            </v-btn>
            <v-btn
              v-else
              v-show="!this.id"
              color="success"
              class="mr-4"
              @click="grava"
            >
              Salvar
            </v-btn>
            <v-btn class="mr-4" @click="limpar"> Limpar </v-btn>

            <v-btn color="red accent-1" class="mr-4" @click="cancelar">
              {{ !this.id ? "Cancelar" : "Voltar" }}
            </v-btn>
          </v-container>
        </v-card>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
// import { required } from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data() {
    return {
      id: this.$route.params.id,
      descricao: "",
      modelo: "",
      marca: "",
      numeroSerie: "",

      nameRules: [
        (v) => !!v || "Nome é obrigatório",
        (v) => (v && v.length <= 5) || "O nome está menor que 5 caracteres",
      ],
    };
  },
  created() {
    if (this.id) {
      this.$http.get(`instrumentos/${this.id}`).then((response) => {
        console.log(response.data);
        this.descricao = response.data.descricao;
        this.modelo = response.data.modelo;
        this.marca = response.data.marca;
        this.numeroSerie = response.data.numeroSerie;
      });
    }
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },

    grava() {
      let data = {
        descricao: this.descricao,
        modelo: this.modelo,
        marca: this.marca,
        numeroSerie: this.numeroSerie,
      };

      this.$http.post("instrumentos", data).then(
        () => {
          alert("Instrumento cadastrado com sucesso");
          this.$router.push({ name: "Instrumento" });
        },
        (err) => {
          alert("Não foi possível efetuar o cadastro. Erro: " + err);
        }
      );
    },

    atualizaDadosGerais() {
      let data = {
        descricao: this.descricao,
        modelo: this.modelo,
        marca: this.marca,
        numeroSerie: this.numeroSerie,
      };

      this.$http.put(`/instrumentos/${this.id}`, data).then(
        () => {
          alert("Atualizado com sucesso");
          this.$router.push("/instrumentos");
        },
        (err) => {
          console.log(err);
          alert("Erro ao atualizar. Erro: " + err);
        }
      );
    },

    limpar() {
      this.descricao = "";
      this.modelo = "";
      this.marca = "";
      this.numeroSerie = "";
    },
    cancelar() {
      this.$router.push("/instrumentos");
    },
  },
};
</script>

<style></style>
