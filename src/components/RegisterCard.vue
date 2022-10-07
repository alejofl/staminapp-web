<template>
      <v-card class="registerCard" rounded="xl">
        <v-container class="pr-8 pl-8 pt-8 pb-8">
          <v-row justify="center" align="center" dense>
            <h1 class="welcome">¡BIENVENIDO!</h1>
          </v-row>
          <v-row align-content="center">
            <v-col class="pt-4 pb-0">
              <v-text-field
                dense
                filled
                label="Nombre Completo"
                v-model="name"
                background-color="#E1E6EC"
                append-icon="person"
                color="secondary">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row align-content="center">
            <v-col class="pt-0 pb-0">
              <v-text-field
                filled
                label="E-Mail"
                v-model="email"
                background-color="#E1E6EC"
                append-icon="email"
                color="secondary">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row align-content="center">
            <v-col class="pt-0 pb-0">
              <v-text-field
                filled
                label="Contraseña"
                v-model="password"
                background-color="#E1E6EC"
                append-icon="key"
                color="secondary">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row align-content="center">
            <v-col class="pt-0 pb-0">
              <v-text-field
                filled
                label="Repetir contraseña"
                v-model="password2"
                background-color="#E1E6EC"
                append-icon="key"
                color="secondary">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" align-content="center">
              <v-btn color="primary" width="272px" height="40" @click="logged_in=false">SIGUIENTE</v-btn>
          </v-row>
          <v-row justify="center" align-content="center">
            <v-col>
              <div width="5px">
                <v-divider></v-divider>
              </div>
            </v-col>
          </v-row>
          <v-row justify="center" align="center" dense>
              <h3 class="signIn"><a class="text-decoration-none" href="/sign-in">Iniciar sesión</a></h3>
          </v-row>
        </v-container>
      </v-card>
</template>

<script>
export default {
  name: "RegisterCard",
  data() {
    return {
      name: '',
      email: '',
      password:'',
      password2:'',
    }
  },
  methods: {
  },
};
</script>

<style scoped>
.registerCard{
  width: 464px;
}
.welcome {
  font-family: "Cera Pro";
  font-weight: 1000;
  font-style: italic;
}
.signIn {
  font-family: "Cera Pro";
  font-weight: 600;
  color: #FD9900;
}

</style>