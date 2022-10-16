<template>
  <v-flex align-self-center>
    <v-card>
      <v-container class="pt-4">
        <v-row no-gutters justify="center" align="center">
          <v-col align="center">
            <v-hover v-slot="{ hover }">
              <v-btn class="mx-2" @click="handle_image" plain fab large >
                <input ref="uploader" class="d-none" type="file" @change="uploadImage">
                <v-fade-transition>
                  <v-overlay class="overlay-class" absolute opacity="0.5" v-if="hover">
                    <v-icon>photo_camera</v-icon>
                  </v-overlay>
                </v-fade-transition>
                <v-avatar size="80">
                  <v-img :src="unsavedBase64Data"></v-img>
                </v-avatar>
              </v-btn>
            </v-hover>
          </v-col>
        </v-row>
        <v-row no-gutters class="pt-4">
          <v-text-field class="py-2" filled label="Nombre completo" v-model="unsavedName" background-color="#E1E6EC" color="secondary" hide-details append-icon="person"></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-text-field class="py-2" filled label="E-Mail" v-model="unsavedMail" background-color="#E1E6EC" color="secondary" hide-details append-icon="mail" disabled></v-text-field>
        </v-row>
        <v-row no-gutters>
          <v-select class="py-2" filled label="Género" v-model="unsavedGender" background-color="#E1E6EC" color="secondary" hide-details append-icon="expand_more" :items="gender_options"></v-select>
        </v-row>
        <v-row no-gutters>
          <v-text-field class="py-2" filled label="Fecha de nacimiento (DD/MM/YYYY)" v-model="unsavedBirthDate" background-color="#E1E6EC" color="secondary" hide-details append-icon="calendar_today"></v-text-field>
        </v-row>
        <v-row no-gutters class="pt-4">
          <v-btn color="error" width="100%" @click="onLogOut()">CERRAR SESIÓN</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";

export default {
  name: "ProfileCard",
  props:{
    gender_options:{
        type: Array,
        default(){
          return ["Masculino","Femenino","Otro"]
  }},

    },

  data() {
    return {
      unsavedName: '',
      unsavedGender: '',
      unsavedBirthDate: '',
      unsavedMail:'',
      unsavedBase64Data: "data:image/jpeg;base64,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\n",
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $currentUser: state => state.currentUser,
    }),
    currentUser: function() {
      return this.$currentUser;
    },
  },
  methods: {
    ...mapActions(useSecurityStore,{$logout : 'logout'}),
    uploadImage(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        let img = new Image()
        img.src = fileReader.result
        img.onload = () => {
          let canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > 200) {
              height *= 200 / width
              width = 200
            }
          } else {
            if (height > 200) {
              width *= 200 / height
              height = 200
            }
          }

          canvas.width = width
          canvas.height = height
          let ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          this.unsavedBase64Data = canvas.toDataURL('image/png', 0.2);
        }
      };
      fileReader.onerror = (error) => {
        this.$emit('apiError');
      };
    },
    handle_image(){
      this.$refs.uploader.click();
    },
    async onLogOut(){
      this.$emit('logging_out');
      await this.$logout();
      this.$router.push({name:'home'});
    },
    setProfileInfo(){
      this.unsavedName = this.currentUser.name
      if(this.currentUser.gender === "male")
        this.unsavedGender = "Masculino"
      else if(this.currentUser.gender === "female")
        this.unsavedGender = "Femenino"
      else if(this.currentUser.gender === "other")
        this.unsavedGender = "Otro"

      if (this.currentUser.birthdate === '' || this.currentUser.birthdate === null) {
        this.unsavedBirthDate = '';
      } else {
        let date = new Date(this.currentUser.birthdate);
        this.unsavedBirthDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      }

      this.unsavedMail = this.currentUser.mail
      this.unsavedBase64Data = this.currentUser.base64Data
    },
    saveProfileInfo(){
      this.currentUser.name = this.unsavedName
      if(this.unsavedGender === "Masculino")
        this.currentUser.gender = "male"
      else if(this.unsavedGender === "Femenino")
        this.currentUser.gender = "female"
      else if(this.unsavedGender === "Otro")
        this.currentUser.gender = "other"
      else
        this.currentUser.gender = null

      let calculatedBirthdate = 0;
      if (this.unsavedBirthDate !== '') {
        let dateParts = this.unsavedBirthDate.split('/')
        if (dateParts.length !== 3) {
          throw {error: 'error'};
        }
        let date = new Date(parseInt(dateParts[2]), parseInt(dateParts[1])-1, parseInt(dateParts[0]));
        calculatedBirthdate = date.getTime();
      }

      this.currentUser.birthdate = this.unsavedBirthDate === '' ? null : calculatedBirthdate
      this.currentUser.base64Data = this.unsavedBase64Data
    }
  },
};
</script>

<style>
.overlay-class{
  border-radius: 50%;
}
</style>