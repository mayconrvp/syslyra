<template>
  <v-container>
    <v-card>
      <v-toolbar color="cyan" dark>
        <v-toolbar-title>Cadastro de Alunos</v-toolbar-title>

        <v-spacer></v-spacer>
        <template v-slot:extension>
          <v-tabs v-model="tab">
            <v-tabs-slider color="purple"></v-tabs-slider>
            <v-tab> Dados Gerais </v-tab>
            <v-tab> Dados de Endereço</v-tab>
            <v-tab> Responsável</v-tab>
            <v-tab> Escolar</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-form @submit.prevent="grava()">
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card>
              <v-container>
                <v-text-field
                  v-model="nome"
                  :error-messages="nameErrors"
                  :counter="60"
                  label="Nome"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="E-mail"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="dataNascimento"
                  label="Data de Nascimento"
                  type="date"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="telefone"
                  label="Telefone"
                  type="string"
                  :counter="15"
                ></v-text-field>
                <v-select
                  v-model="turno"
                  :items="turnos"
                  :error-messages="selectErrors"
                  label="Turno"
                  required
                  @change="$v.select.$touch()"
                  @blur="$v.select.$touch()"
                ></v-select>
                <v-textarea
                  name="input-7-1"
                  label="Observações"
                  value=""
                  hint="Hint text"
                ></v-textarea>
                <v-card class="d-flex justify-center mb-6" flat tile>
                  <v-card class="pa-2">
                    <v-btn
                      primary
                      v-if="this.id"
                      color="success"
                      @click="atualizaDadosGerais"
                    >
                      Atualizar Dados Gerais
                    </v-btn>
                  </v-card>
                </v-card>
              </v-container>
            </v-card>
          </v-tab-item>

          <!-- ----------------ABA DE ENDEREÇO---------------- -->
          <v-tab-item>
            <v-card>
              <v-container>
                <v-text-field
                  v-model="logradouro"
                  :error-messages="nameErrors"
                  :counter="100"
                  label="Logradouro"
                  required
                ></v-text-field>
                <v-text-field v-model="numero" label="Número"></v-text-field>
                <v-text-field v-model="bairro" label="Bairro"></v-text-field>
                <v-text-field
                  v-model="cep"
                  counter="11"
                  label="CEP"
                  ref="cep"
                ></v-text-field>
                <v-text-field
                  v-model="complemento"
                  label="Complemento"
                ></v-text-field>
                <v-text-field
                  v-model="cidade"
                  label="Cidade"
                  type="text"
                  :counter="40"
                  required
                ></v-text-field>
                <v-select
                  v-model="estado"
                  :items="estados"
                  item-value="id"
                  item-text="uf"
                  :error-messages="selectErrors"
                  label="Estado"
                  required
                ></v-select>

                <v-card class="d-flex justify-center mb-6" flat tile>
                  <v-card class="pa-2">
                    <v-btn
                      primary
                      v-if="this.id"
                      color="success"
                      @click="atualizaEndereco"
                    >
                      Atualizar Endereço
                    </v-btn>
                  </v-card>
                </v-card>
              </v-container>
            </v-card>
          </v-tab-item>

          <!------------------ABA DE Responsáveis------------------>
          <v-tab-item>
            <v-card>
              <v-container>
                <v-text-field
                  v-model="responsavel"
                  :error-messages="nameErrors"
                  :counter="100"
                  label="Responsável"
                ></v-text-field>
                <v-text-field
                  v-model="telefoneResp"
                  label="Telefone"
                ></v-text-field>
                <v-text-field
                  v-model="emailResp"
                  label="E-mail"
                  single-line
                  filled
                ></v-text-field>
                <v-card class="d-flex justify-center mb-6" flat tile>
                  <v-card class="pa-2">
                    <v-btn
                      primary
                      v-if="this.id"
                      color="success"
                      @click="atualizaResponsavel"
                    >
                      Atualizar Responsavel
                    </v-btn>
                  </v-card>
                </v-card>
              </v-container>
            </v-card>
          </v-tab-item>
          <!------------------ABA DE Escolar------------------>

          <v-tab-item>
            <v-card>
              <v-container>
                <v-text-field
                  v-model="nomeEscola"
                  :error-messages="nameErrors"
                  :counter="100"
                  label="Nome da Escola"
                ></v-text-field>
                <v-card class="d-flex justify-center mb-6" flat tile>
                  <v-card class="pa-2">
                    <v-btn
                      primary
                      v-if="this.id"
                      color="success"
                      @click="atualizaEscola"
                    >
                      Atualizar Escola
                    </v-btn>
                  </v-card>
                </v-card>
              </v-container>
            </v-card>
          </v-tab-item>
          <!------------------FIM DE ABAS------------------>
        </v-tabs-items>
        <v-card>
          <v-container>
            <v-btn
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
      alunos: [],
      nome: "",
      nameRules: [
        (v) => !!v || "Nome é obrigatório",
        (v) => (v && v.length <= 5) || "O nome está menor que 5 caracteres",
      ],
      dataNascimento: "",
      turno: "",
      telefone: "",
      email: "",
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido",
      ],
      turnos: [
        "Matutino",
        "Vespertino",
        "Noturno",
        "Matutino e Vespertino",
        "Matutino e Noturno",
        "Vespertino e Noturno",
      ],

      idEndereco: "",
      idResponsavel: "",
      idEscola: "",
      estados: [],
      estado: "",
      cidade: "",
      bairro: "",
      cep: "",
      numero: "",
      complemento: "",
      logradouro: "",
      responsavel: "",
      telefoneResp: "",
      emailResp: "",
      nomeEscola: "",
      tab: null,
      items: [
        "Dados Gerais",
        "Dados de Endereço",
        "Responsável",
        "Dados Escolar",
      ],
      cepmask: "##.###-###",
    };
  },
  created() {
    this.$http.get("estados/").then((response) => {
      this.estados = response.data;
    });

    if (this.id) {
      this.$http.get(`alunos/${this.id}`).then((response) => {
        console.log(response.data);
        this.nome = response.data.nome;
        this.dataNascimento = response.data.dataNascimento;
        this.turno = response.data.turno;
        this.telefone = response.data.telefone;
        this.email = response.data.email;
        //Dados de Endereco
        this.idEndereco = response.data.idEndereco;
        this.logradouro = response.data.Endereco.logradouro;
        this.numero = response.data.Endereco.numero;
        this.cep = response.data.Endereco.cep;
        this.complemento = response.data.Endereco.complemento;
        this.bairro = response.data.Endereco.bairro;
        this.cidade = response.data.Endereco.cidade;
        this.estado = response.data.Endereco.Estado;
        //Dados de Responsáveis
        this.idResponsavel = response.data.idResponsavel;
        this.responsavel = response.data.Responsavei.responsavel;
        this.telefoneResp = response.data.Responsavei.telefone;
        this.emailResp = response.data.Responsavei.email;
        //Dado escolar
        this.idEscola = response.data.idEscola;
        this.nomeEscola = response.data.Escola.nome;
      });

      // this.$http.get(`enderecos/${this.idEndereco}`).then((response) => {
      //   console.log(this.idEndereco);
      //   console.log(response.data);
      // });
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
        dataNascimento: this.dataNascimento,
        turno: this.turno,
        telefone: this.telefone,
        email: this.email,
      };

      let dataEndereco = {
        logradouro: this.logradouro,
        numero: this.numero,
        bairro: this.bairro,
        cep: this.cep,
        complemento: this.complemento,
        cidade: this.cidade,
        idEstado: this.estado.id,
      };

      let dataEscola = {
        nome: this.nomeEscola,
      };

      let dataResponsavel = {
        responsavel: this.responsavel,
        telefone: this.telefoneResp,
        email: this.emailResp,
      };

      let idEscola;
      if (!this.nomeEscola) {
        this.$http.post("/escola", dataEscola).then(
          (response) => {
            idEscola = Object.values(response.data);
            idEscola = idEscola[0];
          },
          (err) => {
            alert("Não foi possível cadastrar a escola. Erro: " + err);
          }
        );
      }

      let idResponsavel;
      if (!this.responsavel && !this.telefone) {
        this.$http.post("/responsaveis", dataResponsavel).then(
          (response) => {
            idResponsavel = Object.values(response.data);
            idResponsavel = idResponsavel[0];
          },
          (err) => {
            alert("Não foi possível cadastrar o Responsavel. Erro: " + err);
          }
        );
      }

      let idEndereco;
      this.$http.post("/enderecos", dataEndereco).then(
        (response) => {
          idEndereco = Object.values(response.data);
          idEndereco = idEndereco[0];

          this.$http
            .post("alunos", { ...data, idEndereco, idResponsavel, idEscola })
            .then(
              (response) => {
                console.log({ ...data, idEndereco });
                console.log("Consegui pegar o indereco: " + idEndereco);
                console.log(response);
                alert("Aluno cadastrado com sucesso");
                this.$router.push({ name: "Aluno" });
              },
              (err) => {
                console.log("Não Consegui pegar o indereco: " + idEndereco);
                console.log(err);
                alert("Não foi possível cadastrar.");
              }
            );
        },
        (err) => {
          console.log(err);
          return alert("Não foi possível cadastrar o Aluno.");
        }
      );
    },

    buscaEndereco(id) {
      this.$http.get(`/enderecos/${id}`).then((response) => {
        this.idEndereco = response.data.id;
        console.log("Endereco da função busca: " + this.idEndereco);
        return this.idEndereco;
      });
    },

    atualizaEndereco() {
      let dataEndereco = {
        logradouro: this.logradouro,
        numero: this.numero,
        bairro: this.bairro,
        cep: this.cep,
        complemento: this.complemento,
        cidade: this.cidade,
        idEstado: this.estado,
      };

      this.$http.put(`/enderecos/${this.idEndereco}`, dataEndereco).then(
        (response) => {
          console.log(dataEndereco, response);
          alert("Atualizado com sucesso");
        },
        (err) => {
          console.log(err);
          alert("Erro ao atualizar. Erro: " + err);
        }
      );
    },

    atualizaResponsavel() {
      let dataResponsavel = {
        responsavel: this.responsavel,
        telefone: this.telefoneResp,
        email: this.emailResp,
      };

      this.$http
        .put(`/responsaveis/${this.idResponsavel}`, dataResponsavel)
        .then(
          (response) => {
            console.log(dataResponsavel, response);
            alert("Atualizado com sucesso");
          },
          (err) => {
            console.log(err);
            alert("Erro ao atualizar. Erro: " + err);
          }
        );
    },

    atualizaDadosGerais() {
      let data = {
        nome: this.nome,
        dataNascimento: this.dataNascimento,
        turno: this.turno,
        telefone: this.telefone,
        email: this.email,
        idEndereco: this.idEndereco,
      };

      this.$http.put(`/alunos/${this.id}`, data).then(
        (response) => {
          console.log(response);
          alert("Atualizado com sucesso");
        },
        (err) => {
          console.log(err);
          alert("Erro ao atualizar. Erro: " + err);
        }
      );

      alert("Atualizado com sucesso");
    },

    atualizaEscola() {
      let dataEscola = {
        nome: this.nomeEscola,
      };

      this.$http.put(`/escolas/${this.idEscola}`, dataEscola).then(
        (response) => {
          console.log(dataEscola, response);
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
      this.dataNascimento = "";
      this.turno = "";
      this.telefone = "";
      this.email = "";
      this.logradouro = "";
      this.numero = "";
      this.bairro = "";
      this.cep = "";
      this.complemento = "";
      this.cidade = "";
      this.estado = "";
    },
    cancelar() {
      this.$router.push("/alunos");
    },
  },
};
</script>

<style></style>
