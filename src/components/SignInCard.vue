<template>
  <div>
    <v-card class="signInCard" rounded="xl" v-if="register === 1">
      <v-container class="ma-0 px-6 py-8">
        <v-container class="ma-0 pa-0">
          <h1 class="welcome" justify="center" align="center">¡HOLA OTRA VEZ!</h1>
        </v-container>
        <v-container class="my-12">
          <v-row align-content="center" class="mx-2 mb-4">
              <v-text-field
                filled
                label="E-Mail"
                v-model="email"
                background-color="#E1E6EC"
                append-icon="email"
                color="secondary"
                hide-details>
              </v-text-field>
          </v-row>
          <v-row align-content="center" class="mx-2 mt-4">
              <v-text-field
                filled
                label="Contraseña"
                v-model="password"
                background-color="#E1E6EC"
                append-icon="key"
                color="secondary"
                type="password"
                hide-details>
              </v-text-field>
          </v-row>
        </v-container>
        <v-container class="mt-6">
          <v-row justify="center" align-content="center" class="mb-6">
            <v-btn color="primary" width="272px" height="40">INICIAR SESIÓN</v-btn>
          </v-row>
          <v-row justify="center" align-content="center">
            <v-divider></v-divider>
          </v-row>
          <v-row justify="center" align="center" dense class="mt-6">
            <router-link to="/sign-up" class="text-decoration-none signUp">Registrate</router-link>
          </v-row>
        </v-container>
      </v-container>
    </v-card>

    <v-card class="signInCard" rounded="xl" v-if="register === 0">
      <v-card class="mailVerificationCard" v-if="mailVerification === 0">
        <v-container>
          <p class="mailVerificationText mb-0" justify="center" align="center">
            <v-icon color="white">warning</v-icon> Se envió un e-mail para verificar la cuenta.
          </p>
        </v-container>
      </v-card>
      <v-card class="mailVerificationFailedCard" v-if="mailVerification === 1">
        <v-container>
          <p class="mailVerificationText mb-0" justify="center" align="center">
            <v-icon color="white">warning</v-icon> El e-mail ingresado no está verificado.
            <router-link class="mailVerificationText" to="/explore">Reenviar e-mail</router-link>.
          </p>
        </v-container>
      </v-card>
      <v-container class="ma-0 px-6 py-8">
        <v-container class="ma-0 pa-0">
          <h1 class="welcome" justify="center" align="center">¡HOLA OTRA VEZ!</h1>
        </v-container>
        <v-container class="my-12">
          <v-row align-content="center" class="mx-2 mb-4">
            <v-text-field
              filled
              label="E-Mail"
              v-model="email"
              background-color="#E1E6EC"
              append-icon="email"
              color="secondary"
              hide-details>
            </v-text-field>
          </v-row>
          <v-row align-content="center" class="mx-2 mt-4">
            <v-text-field
              filled
              label="Contraseña"
              v-model="password"
              background-color="#E1E6EC"
              append-icon="key"
              color="secondary"
              type="password"
              hide-details>
            </v-text-field>
          </v-row>
        </v-container>
        <v-container class="mt-6">
          <v-row justify="center" align-content="center" class="mb-6">
            <v-btn color="primary" width="272px" height="40">INICIAR SESIÓN</v-btn>
          </v-row>
          <v-row justify="center" align-content="center">
            <v-divider></v-divider>
          </v-row>
          <v-row justify="center" align="center" dense class="mt-6">
            <router-link to="/sign-up" class="text-decoration-none signUp">Registrate</router-link>
          </v-row>
        </v-container>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SignInCard",
  data() {
    return {
      email: '',
      password:'',
      register: 0,
      mailVerification: 0,
    }
  },
};
</script>

<style scoped>
.signInCard{
  width: 464px;
}
.welcome {
  font-family: "Cera Pro";
  font-weight: 1000;
  font-style: italic;
  line-height: 1;
}
.signUp {
  font-family: "Cera Pro";
  font-weight: 800;
  color: #001833;
}
.mailVerificationCard {
  background-color: #FAD202;
}
.mailVerificationText {
  color: white;
  font-family: Roboto;
}
.mailVerificationFailedCard {
  background-color: #EA1601;
}
</style>