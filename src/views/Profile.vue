<template>
  <div class="myContainer pa-8">
    <v-container class="full-width">
      <v-row>
        <v-col cols="4">
          <ProfileCard ref="form" v-on:apiError="error_snackbar = true" v-on:logging_out="loggedOut = true"></ProfileCard>
        </v-col>
        <v-col cols="8">
          <v-container class="full-width">
            <v-row no-gutters>
              <h1 class="cera-pro">Mis Ejercicios</h1>
            </v-row>
            <v-row no-gutters class="pt-2 negative-margins-for-exercises">
              <template v-for="(n, index) in $exercises">
                <v-col sm="12" md="4" lg="4">
                  <ExercisesCard class="ma-2" :idx="index" v-on:apiError="error_snackbar = true">
                  </ExercisesCard>
                </v-col>
              </template>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="368px" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab class="customFAB secondary--text ma-4" color="primary" fixed right bottom @click="dialog=true;">
          <v-icon>add</v-icon> Añadir Ejercicio
        </v-btn>
      </template>

      <v-flex align-self-center>
        <v-card class="exercise-card">
          <v-container>
            <v-row no-gutters>
              <v-text-field class="py-2" filled label="Nombre" v-model="unsaved_exercise_name" background-color="#E1E6EC" color="secondary" hide-details></v-text-field>
            </v-row>
            <v-row no-gutters>
              <v-textarea :rules="max_length" filled label="Descripción" background-color="#E1E6EC" counter auto-grow v-model="unsaved_exercise_description" color="secondary"></v-textarea>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-container class="pa-0">
                <v-row no-gutters class="pb-2">
                  <v-btn width="100%" :disabled="disableSaved" color="success" @click="addExercise();dialog=false">
                    Guardar Ejercicio
                  </v-btn>
                </v-row>
              </v-container>
            </v-row>
          </v-container>
        </v-card>
      </v-flex>
    </v-dialog>
    <v-snackbar v-model="error_snackbar" :timeout="timeout" color="error"><strong>Error.</strong> Ha ocurrido un error inesperado. Por favor, intentá de nuevo más tarde.</v-snackbar>
  </div>
</template>

<script>
import ProfileCard from "@/components/ProfileCard";
import ExercisesCard from "@/components/ExercisesCard";
import { mapState, mapActions } from "pinia";
import { useExercisesStore } from "@/store/ExercisesStore";
import { Exercise } from "@/api/exercises";
import { UserApi, UpdatedUserData, MetaData } from "@/api/user";
import { useSecurityStore } from "@/store/SecurityStore";

export default {
  name: "Profile",
  components: { ExercisesCard, ProfileCard },

  data() {
    return{
      max_length: [v => v.length <= 200 || 'Hasta 200 caracteres'],
      loggedOut: false,

      dialog:false,
      unsaved_exercise_name:"",
      unsaved_exercise_description:"",
      saved_exercise_name:"",
      saved_exercise_description:"",
      profile_picture:'',
      profile_fullname:'',
      profile_mail:'',
      profile_gender:'',
      profile_birthdate:0,
      is_editing:false,
      Exercises: [],
      error_snackbar: false,
      timeout: 2000,
    }
  },
  watch: {
    dialog(newvalue, oldvalue) {
      if (!newvalue && oldvalue) {
        this.unsaved_exercise_name = '';
        this.unsaved_exercise_description = '';
      }
    }
  },
  computed: {
    ...mapState(useExercisesStore, {
      $exercises: state => state.exercises,
    }),
    ...mapState(useSecurityStore, {
      $currentUser: state => state.currentUser,
    }),
    disableSaved() {
      return this.unsaved_exercise_description.length > 200 || this.unsaved_exercise_description.length === 0 || this.unsaved_exercise_name.length === 0
    }
  },
  methods:{
    ...mapActions(useExercisesStore, {
      $create: 'create',
    }),
    ...mapActions(useExercisesStore, {
      $getSavedExercises: 'getSavedExercises'
    }),
    ...mapActions(useSecurityStore,{
      $update_profile_info: 'update_profile_info',
      $getProfileInfo: 'getProfileInfo',
    }),
    async addExercise(){
      this.saved_exercise_description =this.unsaved_exercise_description;
      this.saved_exercise_name = this.unsaved_exercise_name;
      try {
        const exercise = new Exercise(this.saved_exercise_name, this.saved_exercise_description, 'exercise', null);
        await this.$create(exercise);
      }
      catch (e) {
        this.error_snackbar = true;
      }
    },
    async updateInfo() {
      try{
        const profileInfo = await this.$getProfileInfo();
        const saved_exercises = await this.$getSavedExercises();
        this.$refs.form.setProfileInfo()
      } catch (e) {
        this.error_snackbar = true;
      }
    },
    async beforeLeaving() {
      if (!this.loggedOut) {
        try {
          this.$refs.form.saveProfileInfo();
          let metadata = new MetaData(this.$currentUser.weight, this.$currentUser.height, this.$currentUser.base64Data,this.$currentUser.firstLogIn);
          let dataUpdated = new UpdatedUserData(this.$currentUser.name,"", this.$currentUser.gender, this.$currentUser.birthdate,"","",metadata);
          await UserApi.updateProfileInfo(dataUpdated);
        } catch(e) {}
      }
    },
  },
  beforeMount(){
    this.updateInfo();
  },
  beforeDestroy(){
    this.beforeLeaving();
  }

};
</script>

<style scoped>
.myContainer {
  margin-top: 64px;
  background-color: #F5FAFF;
  height: 100%;
}
.full-width {
  width: 100%;
  max-width: 100%;
}
  .cera-pro {
    font-family: "Cera Pro", sans-serif;
    font-weight: 700;
    font-style: italic;
    color: #001833;
    text-transform: uppercase;
  }
  .customFAB {
    font-weight: 700;
    width: fit-content;
    border-radius: 25px;
    padding: 32px 24px 32px 24px;
  }
  .negative-margins-for-exercises {
    margin: -8px;
  }
</style>