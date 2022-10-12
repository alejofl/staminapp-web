<template>
  <div class="myContainer pa-8">
    <v-container class="full-width">
      <v-row>
        <v-col cols="4">
          <RoutineDetailCard></RoutineDetailCard>
        </v-col>
        <v-col cols="8">
          <CyclesCard></CyclesCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RoutineDetailCard from "@/components/RoutineDetailCard";
import CyclesCard from "@/components/CyclesCard";
export default {
  name: "Routine",
  components: { RoutineDetailCard, CyclesCard }
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