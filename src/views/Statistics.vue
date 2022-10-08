<template>
  <v-container class="myStatistics">
    <v-row>
      <v-col>
        <IMCCard></IMCCard>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import IMCCard from "@/components/IMCCard";
export default {
  name: "Statistics",
  components: { IMCCard }

};
</script>

<style scoped>
.myStatistics {
  position: absolute;
  width: 100%;
  top: 64px;
}
</style>