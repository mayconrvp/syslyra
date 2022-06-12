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
              v-model="descricao"
              :counter="60"
              label="Turma"
            ></v-text-field>

            <v-row>
              <v-col cols="12" sm="6" class="d-flex">
                <v-select
                  v-model="curso"
                  :items="cursos"
                  item-value="id"
                  item-text="nome"
                  label="Curso"
                  required
                ></v-select>
              </v-col>
              <!-- <v-col cols="12" sm="6" class="d-flex">
                
              </v-col> -->
            </v-row>
            <v-text-field
              v-model="horario"
              :counter="60"
              label="Horário"
            ></v-text-field>
            <v-chip label>Dias</v-chip>
            <p>{{ selected }}</p>
            <v-row>
              <v-checkbox
                class="mx-3"
                v-model="selected"
                label="Segunda"
                value="Segunda"
              ></v-checkbox>
              <v-checkbox
                class="mx-3"
                v-model="selected"
                label="Terça"
                value="Terça"
              ></v-checkbox>
              <v-checkbox
                class="mx-3"
                v-model="selected"
                label="Quarta"
                value="Quarta"
              ></v-checkbox>
              <v-checkbox
                class="mx-3"
                v-model="selected"
                label="Quinta"
                value="Quinta"
              ></v-checkbox>
              <v-checkbox
                class="mx-3"
                v-model="selected"
                label="Sexta"
                value="Sexta"
              ></v-checkbox>
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
      idCurso: "",
      descricao: "",
      horario: "",
      cursos: [],
      curso: "",
      selected: [],
      diasUteis: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],

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
      this.$http.get(`turmas/${this.id}`).then((response) => {
        console.log(response.data);
        this.idCurso = response.data.idCurso;
        this.descricao = response.data.descricao;
        this.horario = response.data.horario;
        //        this.dias = response.data.dias;
        this.curso = response.data.Curso;

        this.selected = response.data.dias.split(", ");
        console.log(this.selected);
      });
    }
    this.$http.get("cursos/").then((response) => {
      this.cursos = response.data;
      console.log(this.cursos);
    });
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
        descricao: this.descricao,
        idCurso: this.curso,
        horario: this.horario,
        dias: this.selected.toString(),
      };

      this.$http.post("turmas", data).then(
        (response) => {
          console.log(response);
          alert("Curso cadastrado com sucesso");
          this.$router.push({ name: "Turma" });
        },
        (err) => {
          alert("Não foi possível efetuar o cadastro. Erro: " + err);
        }
      );
    },

    atualizaDadosGerais() {
      console.log(this.selected);

      // this.selected.forEach((nome, i) => {
      //   console.log("a[" + i + "] = " + nome);
      //   this.dias += nome + " ";
      //   console.log(this.dias);
      // });

      let data = {
        descricao: this.descricao,
        idCurso: this.curso,
        horario: this.horario,
        dias: this.selected.toString(),
      };

      this.$http.put(`/turmas/${this.id}`, data).then(
        (response) => {
          console.log(response);
          alert("Atualizado com sucesso");
          this.$router.push("/turmas");
        },
        (err) => {
          console.log(err);
          alert("Erro ao atualizar. Erro: " + err);
        }
      );
    },

    limpar() {
      this.descricao = "";
      this.dias = "";
      this.horario = "";
      this.curso = "";
    },
    cancelar() {
      this.$router.push("/turmas");
    },
  },
};
</script>

<style></style>
