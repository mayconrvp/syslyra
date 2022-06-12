<template>
  <v-container>
    <v-card>
      <v-toolbar color="cyan" dark>
        <v-toolbar-title>Cadastro de Cursos</v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-slot:extension> </template>
      </v-toolbar>

      <v-form @submit.prevent="grava()">
        <v-card>
          <v-container>
            <v-text-field
              v-model="nome"
              :counter="60"
              label="Nome do Curso"
            ></v-text-field>

            <v-textarea
              v-model="descricao"
              name="input-7-1"
              label="Descrição"
              hint="Hint text"
            ></v-textarea>

            <v-row>
              <v-col cols="12" sm="6" class="d-flex">
                <v-text-field
                  v-model="cargaHoraria"
                  type="number"
                  label="Carga Horária"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="d-flex">
                <v-select
                  v-model="nivel"
                  :items="niveis"
                  label="Nível"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card>
          <v-container>
            <v-btn
              v-if="this.id"
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
              Cancelar
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
      descricao: "",
      cargaHoraria: "",
      nivel: "",

      niveis: ["1", "2", "3", "4", "5"],
      nameRules: [
        (v) => !!v || "Nome é obrigatório",
        (v) => (v && v.length <= 5) || "O nome está menor que 5 caracteres",
      ],
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido",
      ],
    };
  },
  created() {
    if (this.id) {
      this.$http.get(`cursos/${this.id}`).then((response) => {
        console.log(response.data);
        this.nome = response.data.nome;
        this.descricao = response.data.descricao;
        this.cargaHoraria = response.data.cargaHoraria;
        this.nivel = response.data.nivel;
      });
    }
  },

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
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
        cargaHoraria: this.cargaHoraria,
        nivel: this.nivel,
        descricao: this.descricao,
      };

      this.$http.post("cursos", data).then(
        (response) => {
          console.log(response);
          alert("Curso cadastrado com sucesso");
          this.$router.push({ name: "Curso" });
        },
        (err) => {
          alert("Não foi possível efetuar o cadastro. Erro: " + err);
        }
      );
    },

    atualizaDadosGerais() {
      let data = {
        nome: this.nome,
        descricao: this.descricao,
        nivel: this.nivel,
        cargaHoraria: this.cargaHoraria,
      };

      this.$http.put(`/cursos/${this.id}`, data).then(
        (response) => {
          console.log(response);
          alert("Atualizado com sucesso");
        },
        (err) => {
          console.log(err);
          alert("Erro ao atualizar. Erro: " + err);
        }
      );
    },

    limpar() {
      this.nome = "";
      this.desccricao = "";
      this.nivel = "";
      this.cargaHoraria = "";
    },
    cancelar() {
      this.$router.push("/cursos");
    },
  },
};
</script>

<style></style>
