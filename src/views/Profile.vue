<template>
  <v-flex>
    <v-container class="profile-style">
      <v-row>
        <v-col sm="3" md="3" lg="3">
<!--          <ProfileCard :base64-data="profile_picture" :name="profile_fullname" :mail="profile_mail" :birthdate="profile_birthdate"-->
<!--          :gender="profile_gender" :weight="profile_weight" :height="profile_height"></ProfileCard>-->
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
<!--                               :exercise_id="n.id"-->
<!--                  :saved_exercise_name="n.saved_exercise_name" :saved_exercise_description="n.saved_exercise_description"-->
<!--                  :unsaved_exercise_description="n.unsaved_exercise_description" :unsaved_exercise_name="n.unsaved_exercise_name">-->
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
import { unsavedName } from "@/components/ProfileCard"

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
        console.log(exercise);
        const exerciseInfo = await this.$create(exercise);
        console.log("Success");
      }
      catch (e) {
        console.log("Error")
        console.log(e.code);
        console.log(e);
      }
    },
    async updateInfo() {
      try{
        console.log("Entro a getCurrent")
        const profileInfo = await this.$getProfileInfo();
        // this.$currentUser.base64Data = "data:image/jpeg;base64,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\n"
        // this.$currentUser.weight = "56";
        // this.$currentUser.height = "176";
        console.log("salgo de getcurrent")
        // this.profile_picture = profileInfo.metadata.profilePicture
        // this.profile_fullname = profileInfo.firstName
        // this.profile_mail = profileInfo.username
        // /*Revisar el tema del genero*/
        // this.profile_gender = profileInfo.gender
        // this.profile_birthdate = profileInfo.birthdate
        // this.profile_weight = profileInfo.metadata.weight[0]
        // this.profile_height = profileInfo.metadata.height[0]
        const saved_exercises = await this.$getSavedExercises();
        this.$refs.form.setProfileInfo()
      }
      catch (e) {
        console.log(e.code)
        console.log(e.name)
      }
    },
    async beforeLeaving() {
      try {
        console.log("Entre al before leaving");
        console.log(this.$currentUser)
        // this.$currentUser.name = unsavedName;
        // this.$currentUser.gender =
        let metadata = new MetaData(this.$currentUser.weight, this.$currentUser.height, this.$currentUser.base64Data);
        let dataUpdated = new UpdatedUserData(this.$currentUser.name,"", this.$currentUser.gender, this.$currentUser.birthdate,"","",metadata);
        await UserApi.updateProfileInfo(dataUpdated);
        console.log("Success");
        console.log("Funciona Before Leaving")
      } catch(e) {
        console.log("Fail");
        console.log(e.code);
      }
    },

    finishedGettingInfo: function () {
      console.log("emito el evento para actualizar la info")
      this.$emit('finished-getting-info');
    }
  },
  beforeMount(){
    /*Antes de que cargue la pagina, debemos pedirle a la API la info del perfil, así aparece de una*/
    this.updateInfo();
  },
  beforeDestroy(){
    /*Antes de que el usuario se vaya de la página sería un buen momento para subir toda la data a la APi
    *si bien lo mejor sería subir solo lo que se cambió, quizás lleva mucho trabajo*/
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