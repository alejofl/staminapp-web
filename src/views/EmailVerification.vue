<template>
  <v-container class="myContainer">
    <v-row class="justify-space-between align-center fill-height">
      <div></div>
      <v-card class="card" rounded="xl">
        <v-card color="error" v-if="expired">
          <v-container class="white--text">
            <p class="mb-0" align="center">
              <v-icon color="white">warning</v-icon> El código de verificación ha vencido.
            </p>
          </v-container>
        </v-card>
        <v-card color="success" v-if="verified">
          <v-container class="white--text">
            <p class="mb-0" align="center">
              <v-icon color="white">verified_user</v-icon> Se ha verificado la cuenta.
            </p>
          </v-container>
        </v-card>
        <v-card color="error" v-if="error">
          <v-container class="white--text">
            <p class="mb-0" align="center">
              <v-icon color="white">warning</v-icon> Ha ocurrido un error. Verificá los datos.
            </p>
          </v-container>
        </v-card>
        <v-container class="my-6">
          <v-row justify="center" align-content="center">
            <v-btn color="primary" width="272px" height="40" :loading="loading" :disabled="loading" @click="loader='loading';resendVerificationEmail();" v-if="expired">ENVIAR NUEVO CÓDIGO</v-btn>
            <router-link to="/sign-in" v-if="verified">
              <v-btn color="primary" width="272px" height="40">INICIAR SESIÓN</v-btn>
            </router-link>
            <v-btn x-large loading plain v-if="!verified && !expired"></v-btn>
          </v-row>
        </v-container>
      </v-card>
      <div></div>
    </v-row>
  </v-container>
</template>

<script>
import { UserApi } from "@/api/user";
import { mapActions } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";

export default {
  name: "EmailVerification",
  data() {
    return {
      verified: false,
      expired: false,
      error: false,
      user: {code: this.$route.query.code, email: this.$route.query.email},
      loader: null,
      loading: false,
    }
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $resendEmailVerification: 'resendEmailVerification',
    }),

    async verify_input() {
      if (!this.user.email || !this.user.code) {
        this.error = true
      }
    },
    async verify_user() {
      try {
        await UserApi.verify_user(this.user)
        this.verified = true
      } catch (e) {
        console.log(e)
        if (e.code === 8) {
          this.expired = true
        } else {
          this.error = true
        }
      }
    },
    async resendVerificationEmail() {
      await this.$resendEmailVerification(this.user.email)
    }
  },
  created() {
    this.verify_input()
    if (!this.error) {
      this.verify_user()
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
};
</script>

<style scoped>
.card {
  width: 464px;
  margin-top: -64px;
}
.myContainer {
  height: 100%;
  max-width: 100%;
  margin-top: 64px;
  background-color: #FD9900;
}
</style>