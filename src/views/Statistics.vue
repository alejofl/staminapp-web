<template>
  <v-container class="myStatistics">
    <v-row>
      <v-col md="6">
        <IMCCard></IMCCard>
      </v-col>
      <v-col md="6">
        <ActivityCard></ActivityCard>
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
  </v-container>
</template>

<script>
import IMCCard from "@/components/IMCCard";
import ActivityCard from "@/components/ActivityCard";
export default {
  name: "Statistics",
  components: { IMCCard, ActivityCard },
  data() {
    return {
      currentWeight: '',
      currentHeight: '',
      weightCompleted: true,
      heightCompleted: true,
    }
  },
  methods: {
    saveData() {
      this.heightCompleted=true;
      this.weightCompleted=true;
    }
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

<!--constructor(password, name, gender, birthdate, email, metadata) {-->
<!--class MetaData {-->
<!--constructor(weight, height, profilePicture) {-->
<!--this.weight = weight;-->
<!--this.height = height;-->
<!--this.profilePicture = profilePicture;-->
<!--}-->
<!--}-->