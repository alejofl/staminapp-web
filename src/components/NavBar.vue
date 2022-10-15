<template>
  <nav class="myNavBar">
    <v-toolbar class="px-16" color="secondary">
      <router-link to="/">
        <v-img max-height="150" max-width="250" src="@/assets/logo.svg"></v-img>
      </router-link>
      <v-spacer></v-spacer>
      <v-container>
        <v-row class="justify-end" v-if="loggedIn">
          <v-btn dark rounded text to="/library" active-class="selected primary--text">Mi Biblioteca</v-btn>
          <v-btn dark rounded text to='/explore' active-class="selected primary--text">Explorar</v-btn>
          <v-btn dark rounded text to='/statistics' active-class="selected primary--text">Estadísticas</v-btn>
          <v-btn dark rounded text><v-icon>search</v-icon></v-btn>
          <div class="vertical-spacer"></div>
          <v-btn dark rounded text to='/profile' active-class="selected primary--text">
            <v-icon class="inherit" >account_circle</v-icon>
          </v-btn>
        </v-row>
        <v-row class="justify-end" v-else>
          <v-btn dark rounded text to='/explore' active-class="selected primary--text">Explorar</v-btn>
          <v-btn dark rounded text><v-icon>search</v-icon></v-btn>
          <div class="vertical-spacer"></div>
          <v-btn dark rounded text to='/sign-up' active-class="selected primary--text">Registrarse</v-btn>
          <v-btn dark rounded text to='/sign-in' active-class="selected primary--text">Ingresar</v-btn>
        </v-row>
      </v-container>
    </v-toolbar>
  </nav>
</template>

<script>
import { mapState } from "pinia"
import { useSecurityStore } from "@/store/SecurityStore";
export default {
  name: "NavBar",
  data() {
    return {
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      loggedIn: state => state.isLoggedIn,
    })
  },
  methods: {
  }
};
</script>

<style>
.myNavBar {
  z-index: 9;
}

.vertical-spacer {
  margin-left: 16px;
  margin-right: 16px;
  border-left: 1px solid #fff;
}

.selected {
  border: 1px solid #FD9900;
}

.routerLink {
  text-decoration: none;
}
</style>
