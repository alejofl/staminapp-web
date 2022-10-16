<template>
  <div class="myContainer pa-8">
    <v-container class="full-width">
      <v-row>
        <v-col cols="4">
          <v-card class="" max-width="600px" rounded>
            <div class="d-flex">
              <v-container>
                <v-row no-gutters class="pb-4">
                  <v-text-field filled label="Peso (kg)" v-model="currentWeight" background-color="#E1E6EC" color="secondary" hide-details></v-text-field>
                </v-row>
                <v-row no-gutters class="pb-4">
                  <v-text-field filled label="Altura (cm)" v-model="currentHeight" background-color="#E1E6EC" color="secondary" hide-details></v-text-field>
                </v-row>
                <v-row no-gutters>
                  <v-btn color="primary" width="100%" :disabled="!validateInput" @click="saveData();">Agregar Datos</v-btn>
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-col>
        <v-col cols="8">
          <IMCCard></IMCCard>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="error_snackbar" :timeout="timeout" color="error"><strong>Error.</strong> Ha ocurrido un error inesperado. Por favor, intentá de nuevo más tarde.</v-snackbar>
  </div>
</template>

<script>
import IMCCard from "@/components/IMCCard";
import { mapActions, mapState } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";
import { MetaData, UpdatedUserData, UserApi } from "@/api/user";

export default {
  name: "Statistics",
  components: { IMCCard },
  data: () => {
    return {
      currentWeight: '',
      currentHeight: '',
      error_snackbar: false,
      timeout: 2000,
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $currentUser: state => state.currentUser,
    }),
    validateInput() {
      if (this.currentHeight === '' || this.currentWeight === '') {
        return false;
      }
      return !isNaN(this.currentHeight) && !isNaN(this.currentWeight);
    },
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
      console.log(this.$currentUser)
      if (this.$currentUser.weight.length === 10) {
        this.$currentUser.weight.splice(0, 1);
        this.$currentUser.height.splice(0, 1);
      }
      this.$currentUser.weight.push(this.currentWeight);
      this.$currentUser.height.push(this.currentHeight);
      try {
        let metadata = new MetaData(this.$currentUser.weight, this.$currentUser.height, this.$currentUser.base64Data,this.$currentUser.firstLogIn);
        let dataUpdated = {'metadata': metadata};
        await UserApi.updateProfileInfo(dataUpdated);
        this.currentWeight = '';
        this.currentHeight = '';
      } catch(e) {
        this.error_snackbar = true;
      }
    },
  },
  beforeMount() {
    this.getDataFromUser();
  },
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
</style>