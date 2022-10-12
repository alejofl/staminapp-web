<template>
  <v-flex>
    <v-container class="profile-style">
      <v-row>
        <v-col sm="3" md="3" lg="3">
          <ProfileCard></ProfileCard>
        </v-col>
        <v-col sm="9" md="9" lg="9">
          <v-container class="exercises-container-style">
            <v-row class="mb-0">
              <h1 class="cera-pro pa-6">MIS EJERCICIOS</h1>
            </v-row>

      <v-row class="mt-0"
      >
        <template v-for="n in Exercises">
        <v-col
          class="pa-8"
          :key="n"
          sm="12"
          md="4"
          lg="4"
        >
          <ExercisesCard :key="n"
                         :saved_exercise_name="n.saved_exercise_name" :saved_exercise_description="n.saved_exercise_description"
          :unsaved_exercise_description="n.unsaved_exercise_description" :unsaved_exercise_name="n.unsaved_exercise_name"
          @delete_card_pressed="deleteExercise"></ExercisesCard>
        </v-col>
        </template>
      </v-row>

    </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="368px"
      transition="dialog-bottom-transition"
    >
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
import {Exercise} from "@/api/exercise.js"
import {useProfileStore } from "@/store/ProfileStore.js";
import { mapActions } from "pinia";
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
      is_editing:false,
      Exercises:[]
    }
  },
  methods:{
    ...mapActions(useProfileStore,{$addExercise: 'addExercise'}),
    ...mapActions(useProfileStore,{$updateProfilePhoto: 'updateProfilePhoto'}),
    ...mapActions(useProfileStore,{$updateProfileInfo: 'updateProfileInfo'}),
    ...mapActions(useProfileStore,{$getProfilePhoto: 'getProfilePhoto'}),
    ...mapActions(useProfileStore,{$getProfileInfo: 'getProfilePhoto'}),
    ...mapActions(useProfileStore,{$deleteExercise: 'deleteExercise'}),
    /*
    add_exercise(){
      this.saved_exercise_description =this.unsaved_exercise_description
      this.saved_exercise_name = this.unsaved_exercise_name
      this.Exercises.push({saved_exercise_name:this.saved_exercise_name,saved_exercise_description:this.saved_exercise_description,unsaved_exercise_name:this.unsaved_exercise_name,unsaved_exercise_description:this.unsaved_exercise_description,})
    }*/
    async addExercise(){
      try {
        this.saved_exercise_description = this.unsaved_exercise_description
        this.saved_exercise_name = this.unsaved_exercise_name
        this.Exercises.push({
          saved_exercise_name: this.saved_exercise_name,
          saved_exercise_description: this.saved_exercise_description,
          unsaved_exercise_name: this.unsaved_exercise_name,
          unsaved_exercise_description: this.unsaved_exercise_description,
        })
        let toReturn = new Exercise(null,null,null);
        const exercise = new Exercise(this.saved_exercise_name, this.saved_exercise_description, 'exercise');
        console.log(exercise);
        toReturn = await this.$addExercise(exercise);
        console.log(toReturn);
      }
      catch (e) {
        console.log(e.code);
      }
    },
    async updateProfilePhoto(){

    },

    async deleteExercise(to_delete_id){
      /*Aquí debo sacar del array el ejercicio con el id que me pasaron y
      * avisarle a la API con el comando delete de la misma*/
      console.log("llegué");
    }
  },
  beforeMount() {
    /*Antes de que cargue la pagina, debemos pedirle a la API la info del perfil, así aparece de una*/
  },

  beforeRouteLeave(){
    /*Antes de que el usuario se vaya de la página sería un buen momento para subir toda la data a la APi
    * si bien lo mejor sería subir solo lo que se cambió, quizás lleva mucho trabajo*/
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