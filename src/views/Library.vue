<template>
  <div class="myContainer pa-8">
    <h1 class="cera-pro">Recientes</h1>
    <v-row>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <RecentCard></RecentCard>
      </v-col>
    </v-row>
    <h1 class="pt-6 cera-pro">Mi Biblioteca</h1>
    <v-row justify="start">
      <v-col
        v-for="n in 6"
        :key="n"
        cols="12"
        sm="12"
        md="6"
        lg="3"
      >
        <RoutineCard></RoutineCard>
      </v-col>
    </v-row>
    <v-btn fab class="customFAB secondary--text ma-4" color="primary" fixed right bottom>
      <v-icon>add</v-icon> Añadir Rutina
    </v-btn>
  </div>
</template>

<script>
import RecentCard from "@/components/RecentCard";
import RoutineCard from "@/components/RoutineCard";
import { mapActions, mapState } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";
import { useExercisesStore } from "@/store/ExercisesStore";
import { Exercise } from "@/api/exercises";
import { MetaData, UpdatedUserData, UserApi } from "@/api/user";

export default {
  name: "Library",
  components: { RoutineCard, RecentCard},
  computed: {
    ...mapState(useSecurityStore, {
      $currentUser: state => state.currentUser,
    }),
  },
  methods:{
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $updateProfileInfo: 'updateProfileInfo',
    }),

    ...mapActions(useExercisesStore, {
      $create: 'create',
    }),

    async checkFirstTimeUser(){
      try{
        const currentUser = await this.$getCurrentUser()
        if(currentUser.metadata.firstLogIn === true){
          const defaultExercise1 = new Exercise("Abdominales","Ponerse en una posición tumbada y pasar a una sentada al llevar el pecho hacia los muslos. Este movimiento lo podemos realizar especialmente gracias al músculo recto abdominal.","exercise",null);
          const defaultExercise2 = new Exercise("Flexiones de brazos","Apóyate boca abajo en el suelo, con los brazos estirados y las manos separadas, con los pies juntos. Luego, flexiona los brazos para llevar el pecho al suelo evitando curvarte.","exercise",null);
          const defaultExercise3 = new Exercise("Plancha","Colocar el cuerpo elevado en paralelo al suelo, apoyado con los antebrazos en la parte delantera y la punta de los pies atrás.","exercise",null);
          const defaultExercise4 = new Exercise("Sentadillas","Flexionar de las rodillas hacia abajo y posteriormente hacia arriba, partiendo de una posición vertical del cuerpo.","exercise",null);
          const defaultExercise5 = new Exercise("Barra","Mantén la espalda recta y sujeta la barra con las manos separadas y las palmas mirando hacia ti. Contrae el abdomen y tira de la barra hacia tu cuerpo hasta que toque tu esternón.","exercise",null);
          const defaultExercise6 = new Exercise("Salto con soga","El movimiento se hace básicamente con las muñecas, el tronco no debe estar rígido, los hombros deben permanecer relajados.","exercise",null);
          const defaultExercise7 = new Exercise("Estocadas","Llevar un pie de apoyo hacia el frente, con las rodillas dobladas, mientras que el otro se dirige hacia atrás.","exercise",null);
          const defaultExercise8 = new Exercise("Paralelas","Posicionarse por debajo de las barras paralelas, y realizar la contracción, con el pecho en alto, juntando las escápulas para una mejor contracción.","exercise",null);
          const defaultExercise9 = new Exercise("Escaleras","Llevar un pie al escalón, luego subir el otro. Bajar el primer pie y realizar lo mismo con el otro.","exercise",null);
          await this.$create(defaultExercise1);
          await this.$create(defaultExercise2);
          await this.$create(defaultExercise3);
          await this.$create(defaultExercise4);
          await this.$create(defaultExercise5);
          await this.$create(defaultExercise6);
          await this.$create(defaultExercise7);
          await this.$create(defaultExercise8);
          await this.$create(defaultExercise9);
          //una vez que ya subí los ejercicios default, debo actualizar el valor de firstlogin en la api
          this.$currentUser.firstLogIn = false;
          this.$currentUser.weight = currentUser.metadata.weight;
          this.$currentUser.height = currentUser.metadata.height;
          this.$currentUser.base64Data = currentUser.metadata.profilePicture;
          this.$currentUser.name = currentUser.firstName;
          this.$currentUser.gender = currentUser.gender;
          this.$currentUser.birthdate = currentUser.birthdate;
          let metadata = new MetaData(this.$currentUser.weight, this.$currentUser.height, this.$currentUser.base64Data,this.$currentUser.firstLogIn);
          let dataUpdated = new UpdatedUserData(this.$currentUser.name,"", this.$currentUser.gender, this.$currentUser.birthdate,"","",metadata);
          await this.$updateProfileInfo(dataUpdated);
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  },
  beforeMount() {
    this.checkFirstTimeUser();
  }
};
</script>

<style scoped>
.myContainer {
  margin-top: 64px;
  background-color: #F5FAFF;
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
</style>