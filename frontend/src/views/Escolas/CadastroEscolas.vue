<template>
  <v-container>
    <v-card>
      <v-toolbar color="cyan" dark>
        <v-toolbar-title>Cadastro de Turmas</v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-slot:extension> </template>
      </v-toolbar>

      <v-form @submit.prevent="grava()">
        <v-card>
          <v-container>
            <v-text-field
              v-model="nome"
              :counter="100"
              label="Nome da Escola"
            ></v-text-field>
            <v-text-field
              v-model="telefone"
              :counter="100"
              label="Telefone"
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
      nome: "",
      telefone: "",
      nameRules: [
        (v) => !!v || "Nome é obrigatório",
        (v) => (v && v.length <= 5) || "O nome está menor que 5 caracteres",
      ],
    };
  },
  created() {
    if (this.id) {
      this.$http.get(`escolas/${this.id}`).then((response) => {
        console.log(response.data);
        this.nome = response.data.nome;
        this.telefone = response.data.telefone;
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
        nome: this.nome,
      };

      this.$http.post("escolas", data).then(
        () => {
          alert("Escola cadastrado com sucesso");
          this.$router.push({ name: "Escola" });
        },
        (err) => {
          alert("Não foi possível efetuar o cadastro. Erro: " + err);
        }
      );
    },

    atualizaDadosGerais() {
      console.log(this.selected);

      let data = {
        nome: this.nome,
        telefone: this.telefone,
      };

      this.$http.put(`/escolas/${this.id}`, data).then(
        () => {
          alert("Atualizado com sucesso");
          this.$router.push("/escolas");
        },
        (err) => {
          console.log(err);
          alert("Erro ao atualizar. Erro: " + err);
        }
      );
    },

    limpar() {
      this.nome = "";
      this.dias = "";
      this.horario = "";
      this.curso = "";
    },
    cancelar() {
      this.$router.push("/escolas");
    },
  },
};
</script>

<style></style>
