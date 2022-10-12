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
  </v-container>
</template>

<script>
import IMCCard from "@/components/IMCCard";
import ActivityCard from "@/components/ActivityCard";
export default {
  name: "Statistics",
  components: { IMCCard, ActivityCard }
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