<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <MenuLat></MenuLat>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Lyra Carlos Gomes</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MenuLat from "./components/MenuLat.vue";
import "./styles/global.css";
export default {
  data: () => ({
    drawer: null,
  }),
  components: { MenuLat },
};
</script>