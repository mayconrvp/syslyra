<template>
  <span>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> SYSLYRA </v-list-item-title>
        <v-list-item-subtitle> Sistema de Gestão </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-group :value="false" no-action>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon v-text="iconAdd"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cadastros</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(cadastro, i) in cadastros"
          :key="i"
          :to="cadastro.to"
          link
        >
          <v-list-item-title v-text="cadastro.title"></v-list-item-title>

          <v-list-item-icon>
            <v-icon v-text="cadastro.icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false" no-action>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon v-text="iconAdjust"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pedagógico</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(pedag, i) in pedagogicos"
          :key="i"
          :to="pedag.to"
          link
        >
          <v-list-item-title v-text="pedag.title"></v-list-item-title>

          <v-list-item-icon>
            <v-icon v-text="pedag.icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <v-list-item v-for="item in items" :key="item.title" link>
        <template>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list>
  </span>
</template>

<script>
export default {
  data: () => ({
    iconAdd: "mdi-account-plus",
    iconAdjust: "mdi-adjust",
    drawer: null,
    items: [{ title: "Configurações", icon: "mdi-cog" }],
    cadastros: [
      { title: "Alunos", icon: "mdi-card-plus-outline", to: "/alunos" },
      { title: "Curso", icon: "mdi-card-plus-outline", to: "/cursos" },
      { title: "Turma", icon: "mdi-card-plus-outline", to: "/turmas" },
      { title: "Escolas", icon: "mdi-card-plus-outline", to: "/escolas" },
      {
        title: "Instrumentos",
        icon: "mdi-card-plus-outline",
        to: "/instrumentos",
      },

      { title: "Matrículas", icon: "mdi-card-plus-outline", to: "/" },
    ],
    pedagogicos: [
      { title: "Funcionários", icon: "mdi-border-color", to: "/" },
      { title: "Avaliações", icon: "mdi-border-color", to: "/" },
    ],
    right: null,
  }),
};
</script>

<style scoped>
a:hover {
  background-color: darkgray;
  transition: 0.2s;
}
</style>