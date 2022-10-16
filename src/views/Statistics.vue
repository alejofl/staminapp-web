<template>
  <v-container class="myStatistics">
    <v-row>
      <v-col md="6">
        <IMCCard></IMCCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-text-field v-model="currentWeight" label="Peso en kg" @change="weightCompleted=false"></v-text-field>
      </v-col>
      <v-col md="6">
        <v-text-field v-model="currentHeight" label="Altura en cm" @change="heightCompleted=false"></v-text-field>
      </v-col>
    </v-row>
    <v-row align-content="center" justify="center" align="center">
      <v-btn @click="saveData()" :disabled="heightCompleted && weightCompleted">Guardar</v-btn>
    </v-row>
    <v-snackbar v-model="error_snackbar" :timeout="timeout" color="error"><strong>Error.</strong> Ha ocurrido un error inesperado. Por favor, intentá de nuevo más tarde.</v-snackbar>
  </v-container>

</template>

<script>
import IMCCard from "@/components/IMCCard";
import ActivityCard from "@/components/ActivityCard";
import { mapActions, mapState } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";
import { MetaData, UpdatedUserData, UserApi } from "@/api/user";
import { useExercisesStore } from "@/store/ExercisesStore";


export default {
  name: "Statistics",
  components: { IMCCard, ActivityCard },
  data: () => {
    return {
      currentWeight: '',
      currentHeight: '',
      weightCompleted: true,
      heightCompleted: true,
      error_snackbar: false,
      timeout: 2000,
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $currentUser: state => state.currentUser,
    }),
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getProfileInfo: 'getProfileInfo',
    }),
    async getDataFromUser() {
      try {
        const currentUser = await this.$getProfileInfo();
        this.$currentUser.weight = currentUser.metadata.weight;
        this.$currentUser.height = currentUser.metadata.height;
      } catch(e) {
        this.error_snackbar = true;
      }
    },
    async saveData() {
      this.heightCompleted = true;
      this.weightCompleted = true;
      if (this.$currentUser.weight.length === 10) {
        this.$currentUser.weight.splice(0, 1);
        this.$currentUser.height.splice(0, 1);
      }
      this.$currentUser.weight.push(this.currentWeight);
      this.$currentUser.height.push(this.currentHeight);
      try {
        let metadata = new MetaData(this.$currentUser.weight, this.$currentUser.height, this.$currentUser.base64Data,this.$currentUser.firstLogIn);
        let dataUpdated = new UpdatedUserData(this.$currentUser.name,"", this.$currentUser.gender, this.$currentUser.birthdate,"","",metadata);
        await UserApi.updateProfileInfo(dataUpdated);
      } catch(e) {
        console.log(e);
        this.error_snackbar = true;
      }
    },
    async beforeLeaving() {
      try {
        let metadata = new MetaData(this.$currentUser.weight, this.$currentUser.height, this.$currentUser.base64Data,this.$currentUser.firstLogIn);
        let dataUpdated = new UpdatedUserData(this.$currentUser.name,"", this.$currentUser.gender, this.$currentUser.birthdate,"","",metadata);
        await UserApi.updateProfileInfo(dataUpdated);
      } catch(e) {
        console.log(e);
        this.error_snackbar = true;
      }
    }
  },
  beforeMount() {
    this.getDataFromUser();
  },
  beforeDestroy(){
    this.beforeLeaving();
  }
};
</script>

<style scoped>
.myStatistics {
  margin-top: 64px;
  height: 100%;
  max-width: 100%;
  background-color: #F5FAFF;
}
</style>