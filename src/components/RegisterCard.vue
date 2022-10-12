<template>
  <div>
    <v-card class="registerCard" rounded="xl" v-if="steps === 0">
      <v-card class="registerFailedCard" v-if="failedRegister">
        <v-container>
          <p class="registerFailedText mb-0" justify="center" align="center" v-if="emailAlreadyExists">
            <v-icon color="white">warning</v-icon> El e-mail ingresado ya está registrado
          </p>
          <p class="registerFailedText mb-0" justify="center" align="center" v-if="emailFormatIsIncorrect">
            <v-icon color="white">warning</v-icon> El formato del e-mail es incorrecto
          </p>
          <p class="registerFailedText mb-0" justify="center" align="center" v-if="genericError">
            <v-icon color="white">warning</v-icon> Ocurrió un error. Vuelve a intentarlo más tarde.
          </p>
        </v-container>
      </v-card>
      <v-container class="ma-0 px-6 py-4">
        <v-container class="ma-0 pa-0">
          <h1 class="welcome" justify="center" align="center">¡BIENVENIDO!</h1>
        </v-container>
        <v-container class="mt-6 mb-0">
          <v-row align-content="center" class="mx-2 mb-0">
            <v-text-field
              filled
              label="Nombre completo"
              v-model="name"
              background-color="#E1E6EC"
              append-icon="person"
              color="secondary"
              :error-messages="getErrors('name', $v.name)"
              @blur="$v.name.$touch()">
            </v-text-field>
          </v-row>
          <v-row align-content="center" class="mx-2 my-0">
            <v-text-field
              filled
              label="E-Mail"
              v-model="email"
              background-color="#E1E6EC"
              append-icon="email"
              color="secondary"
              :error-messages="getErrors('email', $v.email)"
              @blur="$v.email.$touch()">
            </v-text-field>
          </v-row>
          <v-row align-content="center" class="mx-2 my-0">
            <v-text-field
              filled
              label="Contraseña"
              v-model="password"
              background-color="#E1E6EC"
              append-icon="key"
              color="secondary"
              type="password"
              :error-messages="getErrors('password', $v.password)"
              @blur="$v.password.$touch()">
            </v-text-field>
          </v-row>
          <v-row align-content="center" class="mx-2 mt-0">
            <v-text-field
              filled
              label="Repetir contraseña"
              v-model="password2"
              background-color="#E1E6EC"
              append-icon="key"
              color="secondary"
              type="password"
              :error-messages="getErrors('password2', $v.password2)"
              @blur="$v.password2.$touch()">
            </v-text-field>
          </v-row>
        </v-container>
        <v-container class="mt-6">
          <v-row justify="center" align-content="center" class="mb-6">
            <v-btn color="primary" width="272px" height="40" @click="validate()">SIGUIENTE</v-btn>
          </v-row>
          <v-row justify="center" align-content="center">
            <v-divider></v-divider>
          </v-row>
          <v-row justify="center" align="center" dense class="mt-6">
            <router-link to="/sign-in" class="text-decoration-none signIn">Iniciar sesión</router-link>
          </v-row>
        </v-container>
      </v-container>
    </v-card>


    <v-card class="registerCard" rounded="xl" v-if="steps === 1">
      <v-container class="ma-0 px-6 py-8">
        <v-container class="ma-0 pa-0">
          <h1 class="welcome" justify="center" align="center">TERMINEMOS DE</h1>
          <h1 class="welcome" justify="center" align="center">CREAR TU PERFIL</h1>
        </v-container>
        <v-container class="mt-12 mb-4 pa-0">
          <v-row justify="center" align="center" no-gutters>
            <v-col align="center" no-gutters>
              <v-hover v-slot="{ hover }">
                <v-btn class="mx-2" @click="handle_image" plain fab large >
                  <input ref="uploader" class="d-none" type="file" @change="uploadImage">
                  <v-fade-transition>
                    <v-overlay class="overlay-class" absolute opacity="0.5" v-if="hover">
                      <v-icon>photo_camera</v-icon>
                    </v-overlay>
                  </v-fade-transition>
                  <v-avatar size="80">
                    <v-img :src="base64Data"></v-img>
                  </v-avatar>
                </v-btn>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="mb-12">
          <v-row align-content="center" class="mx-2 mb-4">
            <v-select
              label="Género"
              v-model="gender":items="gender_options"
              append-icon="expand_more"
              color="secondary"
              filled
              background-color="#E1E6EC"
              hide-details
            >
            </v-select>
          </v-row>
          <v-row align-content="center" class="mx-2 my-4">
            <v-text-field
              filled
              label="Fecha de Nacimiento DD/MM/YYYY"
              v-model="birthdate"
              background-color="#E1E6EC"
              append-icon="calendar_today"
              color="secondary"
              hide-details>
            </v-text-field>
          </v-row>
          <v-row align-content="center" class="mx-2 mt-4">
            <v-col md="6" class="py-0 pl-0">
              <v-text-field
                filled
                label="Peso (kg)"
                v-model="weight"
                background-color="#E1E6EC"
                append-icon="monitor_weight"
                color="secondary"
                hide-details>
              </v-text-field>
            </v-col>
            <v-col md="6" class="py-0 pr-0">
              <v-text-field
                filled
                label="Altura (cm)"
                v-model="height"
                background-color="#E1E6EC"
                append-icon="straighten"
                color="secondary"
                hide-details>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="mt-6">
          <v-row justify="center" align-content="center" class="mb-6">
            <v-btn color="primary" width="272px" height="40" :loading="loading" @click="createUser(); loader='loading'" >REGISTRARSE</v-btn>
          </v-row>
          <v-row justify="center" align="center" dense class="mt-6" @click="createUser()">
            Saltar este paso
          </v-row>
        </v-container>
      </v-container>
    </v-card>
  </div>
</template>


<script>
import { mapActions } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";
import { UserData, MetaData } from "@/api/user";
import { required, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  name: "RegisterCard",
  data() {
    return {
      name: '',
      email: '',
      password:'',
      password2:'',
      failedRegister: false,
      steps: 0,
      gender: '',
      birthdate:'',
      weight:'',
      height:'',
      gender_options:['Masculino','Femenino','Otro'],
      logged_in: true,
      loader: null,
      loading: false,
      emailAlreadyExists: false,
      emailFormatIsIncorrect: false,
      genericError: false,
      base64Data: "data:image/jpeg;base64,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\n",
    }
  },
  validations () {
    return {
      name: { required },
      email: { required },
      password: { required },
      password2: { required, sameAsPassword : sameAs('password') }
    }
  },
  methods: {
    validate() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.steps = 1;
      }
    },
    getErrors(name, model) {
      const errors = [];
      if (!model.$dirty) {
        return errors;
      }
      switch (name) {
        case "name":
          !model.required && errors.push("El nombre completo es obligatorio");
          break;
        case "email":
          !model.required && errors.push("El e-mail es obligatorio");
          break;
        case "password":
          !model.required && errors.push("La contraseña es obligatoria");
          break;
        case "password2":
          !model.required && errors.push("Repetir contraseña es obligatoria");
          !model.sameAsPassword && errors.push("Repetir contraseña y Contraseña deben ser iguales");
          break;
        default:
          break;
      }
      return errors;
    },
    uploadImage(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.base64Data = fileReader.result
      };
      fileReader.onerror = (error) => {
        console.log(error)
      };
    },
    handle_image(){
      this.$refs.uploader.click();
    },
    ...mapActions(useSecurityStore, {
      $createUser: 'createUser',
    }),
    async createUser() {
      try {
        this.loading = true;
        if (this.gender === 'Masculino') {
          this.gender = 'male'
        } else if (this.gender === 'Femenino') {
          this.gender = 'female'
        } else if (this.gender === 'Otro') {
          this.gender = 'other'
        }
        const userData = new UserData(this.email, this.password, this.name, '', this.gender,
          this.birthdate, this.email, '12', '', new MetaData(this.weight, this.height, this.base64Data))
        await this.$createUser(userData);
        this.loading = false;
        this.$router.push({name : 'sign-in', query: {registered: null}});
      } catch (e) {
        this.emailFormatIsIncorrect = false;
        this.emailAlreadyExists = false;
        this.genericError = false;
        if (e.code === 1) {
          this.emailFormatIsIncorrect = true;
        } else if (e.code === 2) {
          this.emailAlreadyExists = true;
        } else {
          this.genericError = true;
        }
        this.loading = false;
        this.failedRegister = true;
        this.steps = 0;
      }
    },
  }
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
  line-height: 1;
}
.signIn {
  font-family: "Cera Pro";
  font-weight: 800;
  color: #001833;
}
.overlay-class{
  border-radius: 50%;
}
.skipThisStep {
  font-family: "Cera Pro";
  font-weight: 800;
  color: #001833;
}
.registerFailedText {
  color: white;
  font-family: Roboto;
}
.registerFailedCard {
  background-color: #EA1601;
}
</style>