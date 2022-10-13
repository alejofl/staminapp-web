<template>
  <div>
    <v-card class="signInCard" rounded="xl">
      <v-card class="mailVerificationCard" v-if="register">
        <v-container>
          <p class="mailVerificationText mb-0" justify="center" align="center">
            <v-icon color="white">warning</v-icon> Se envió un e-mail para verificar la cuenta.
          </p>
        </v-container>
      </v-card>
      <v-card class="mailVerificationFailedCard" v-if="failedEmailVerification">
        <v-container>
          <p class="mailVerificationText mb-0" justify="center" align="center">
            <v-icon color="white">warning</v-icon> El e-mail ingresado no está verificado.
            <v-btn text class="mailVerificationText" @click="resendEmailVerification()">Reenviar e-mail</v-btn>
          </p>
        </v-container>
      </v-card>
      <v-card class="mailVerificationFailedCard" v-if="failedLogIn">
        <v-container>
          <p class="mailVerificationText mb-0" justify="center" align="center">
            <v-icon color="white">warning</v-icon> Su E-mail o Contraseña son incorrectos.
          </p>
        </v-container>
      </v-card>
      <v-card class="mailVerificationFailedCard" v-if="serverError">
        <v-container>
          <p class="mailVerificationText mb-0" justify="center" align="center">
            <v-icon color="white">warning</v-icon> Oh! Algo salió mal. Prueba más tarde.
          </p>
        </v-container>
      </v-card>
      <v-container class="ma-0 px-6 py-8">
        <v-container class="ma-0 pa-0">
          <h1 class="welcome" justify="center" align="center">¡HOLA OTRA VEZ!</h1>
        </v-container>
        <v-container class="my-12" @keyup.enter="login()">
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
            <v-btn color="primary" width="272px" height="40" @click="login()" >INICIAR SESIÓN</v-btn>
          </v-row>
          <v-row justify="center" align-content="center">
            <v-divider></v-divider>
          </v-row>
          <v-row justify="center" align="center" dense class="mt-6 mb-0">
            ¿No tenés cuenta?
          </v-row>
          <v-row justify="center" align="center" dense class="my-0">
            <router-link to="/sign-up" class="text-decoration-none signUp">Registrate</router-link>
          </v-row>
        </v-container>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";
import { Credentials } from "@/api/user";

export default {
  name: "SignInCard",
  data() {
    return {
      email: '',
      password:'',
      register: 'registered' in this.$route.query,
      failedEmailVerification: false,
      failedLogIn: false,
      serverError: false,
    }
  },
  computed: {

  },
  methods: {
    ...mapActions(useSecurityStore, {
      $login: 'login',
      $resendEmailVerification: 'resendEmailVerification',
    }),
    async login() {
      try {
        const credentials = new Credentials(this.email, this.password)
        await this.$login(credentials, true)
        this.$router.push({name: 'library'})
      } catch (e) {
        if(e.code === 4) {
          this.failedLogIn = true
          this.failedEmailVerification = false
          this.serverError = false
          this.register = false
        } else if (e.code === 8) {
          this.failedLogIn = false
          this.failedEmailVerification = true
          this.serverError = false
          this.register = false
        } else {
          this.failedLogIn = false
          this.failedEmailVerification = false
          this.serverError = true
          this.register = false
        }
      }
    },
    async resendEmailVerification() {
      await this.$resendEmailVerification(this.email)
    }
  }
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