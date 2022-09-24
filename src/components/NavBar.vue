<template>
  <nav>
    <v-toolbar color="secondary" rounded>
      <v-img max-height="150" max-width="250" src="@/assets/logo.svg"></v-img>
      <v-spacer></v-spacer>
      <v-container>
        <v-row class="justify-end" v-if="loggedIn">
          <v-btn dark rounded text>Mi Biblioteca</v-btn>
          <v-btn class="selected primary--text" dark rounded text>Explorar</v-btn>
          <v-btn dark rounded text>Estadísticas</v-btn>
          <v-btn dark rounded text><v-icon>search</v-icon></v-btn>
          <div class="vertical-spacer"></div>
          <v-btn dark rounded text><v-icon>account_circle</v-icon></v-btn>
        </v-row>
        <v-row class="justify-end" v-else>
          <v-btn dark rounded text>Explorar</v-btn>
          <v-btn dark rounded text><v-icon>search</v-icon></v-btn>
          <div class="vertical-spacer"></div>
          <v-btn dark rounded text>Registrarse</v-btn>
          <v-btn class="selected primary--text" dark rounded text>Ingresar</v-btn>
        </v-row>
      </v-container>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      loggedIn: true
    }
  }
};
</script>

<style>
.vertical-spacer {
  margin-left: 16px;
  margin-right: 16px;
  border-left: 1px solid #fff;
}

.selected {
  border: 1px solid #FD9900;
}
</style>
