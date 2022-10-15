<template>
  <v-flex>
    <v-container class="profile-style">
      <v-row>
        <v-col sm="3" md="3" lg="3">
          <ProfileCard ref="form"></ProfileCard>
        </v-col>

        <v-col sm="9" md="9" lg="9">
          <v-container class="exercises-container-style">
            <v-row class="mb-0">
              <h1 class="cera-pro pa-6">MIS EJERCICIOS</h1>
            </v-row>
            <v-row class="mt-0">
              <template v-for="(n, index) in $exercises">
              <v-col class="pa-8" sm="12" md="4" lg="4">
                <ExercisesCard :idx="index">
                </ExercisesCard>
              </v-col>
              </template>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="368px" transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">

          <v-btn fab class="customFAB secondary--text ma-4" color="primary" fixed right bottom @click="dialog=true;
            unsaved_exercise_name=default_exercise_name;unsaved_exercise_description=default_exercise_description">
            <v-icon>add</v-icon> Añadir Ejercicio
          </v-btn>

        </template>
          <v-flex align-self-center>
            <v-card class="exercise-card" color=#E1E6EC outlined rounded="xl">
              <v-container>
                <v-card-title class="secondary--text font-weight-bold">
                  <v-text-field v-model="unsaved_exercise_name" color="secondary"></v-text-field>
                </v-card-title>
                <v-card-text class="secondary--text grow">
                  <v-textarea color="secondary" v-model="unsaved_exercise_description"></v-textarea>
                </v-card-text>
                <v-row justify="center" align="center">
                  <v-col md="12" align="center">
                    <v-btn width="100%" color="green" @click="addExercise();dialog=false">
                      GUARDAR EJERCICIO</v-btn>
                  </v-col>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col md="12" align="center">
                    <v-btn color="error" @click="dialog=false" width="100%">ELIMINAR EJERCICIO</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-flex>
      </v-dialog>
    </v-row>
  </v-flex>
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
      dialog:false,
      default_exercise_name:'Ejercicio sin nombre',
      default_exercise_description:"Inserte descripción...",
      unsaved_exercise_name:'Ejercicio sin nombre',
      unsaved_exercise_description:"Inserte descripción...",
      saved_exercise_name:"Hola",
      saved_exercise_description:"COMO",
      profile_picture:'',
      profile_fullname:'',
      profile_mail:'',
      profile_gender:'',
      profile_birthdate:0,
      profile_weight:'',
      profile_height:'',
      is_editing:false,
      Exercises: []
    }
  },
  computed: {
    ...mapState(useExercisesStore, {
      $exercises: state => state.exercises,
    }),
    ...mapState(useSecurityStore, {
      $currentUser: state => state.currentUser,
    }),
  },
  methods:{
    ...mapActions(useExercisesStore, {
      $create: 'create',
      // $getSavedExercises: 'getSavedExercises'
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
        const exerciseInfo = await this.$create(exercise);
      }
      catch (e) {
        console.log(e.code);
      }
    },
    async updateInfo() {
      try{
        const profileInfo = await this.$getProfileInfo();
        const saved_exercises = await this.$getSavedExercises();
        this.$refs.form.setProfileInfo()
      }
      catch (e) {
        console.log(e.code)
      }
    },
    async beforeLeaving() {
      try {
        this.$refs.form.saveProfileInfo();
        let metadata = new MetaData(this.$currentUser.weight, this.$currentUser.height, this.$currentUser.base64Data,this.$currentUser.firstLogIn);
        let dataUpdated = new UpdatedUserData(this.$currentUser.name,"", this.$currentUser.gender, this.$currentUser.birthdate,"","",metadata);
        await UserApi.updateProfileInfo(dataUpdated);
      } catch(e) {
        console.log(e.code);
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
  .profile-style{
    width: 100%;
    margin-top: 64px;
    max-width: 100%;
  }
  .exercises-container-style{
    width: 100%;
    max-width: 100%;
  }
  .cera-pro {
    font-family: "Cera Pro", sans-serif;
    font-weight: 700;
    font-style: italic;
    color: #001833;
    text-transform: uppercase;
    text-decoration: underline;
  }
  .customFAB {
    font-weight: 700;
    width: fit-content;
    border-radius: 25px;
    padding: 32px 24px 32px 24px;
  }
</style>