<template>
  <div class="myContainer pa-8">
    <v-row class="pa-3">
      <v-chip-group v-model="selected_tags" multiple class="text--secondary" active-class="secondary white--text" value="selected_tags">
        <v-chip v-for="tag in tags" :key="tag" filter class="myChip">
          <strong>{{ tag.toUpperCase() }}</strong>
        </v-chip>
      </v-chip-group>
    </v-row>
    <v-row justify="start">
      <v-col
        v-for="n in 9"
        :key="n"
        cols="12"
        sm="12"
        md="6"
        lg="3"
      >
        <RoutineCard></RoutineCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RoutineCard from "@/components/RoutineCard";

export default {
  name: "Explore",
  components: { RoutineCard },
  data: () => {
    return {
      tags: ['Tren Superior', "Tren Inferior", "Zona Media", "Aeróbico", "Integral", "Principiante", "Intermedio", "Avanzado"],
      selected_tags: []
    }
  }
};
</script>

<style scoped>
.myContainer {
  margin-top: 64px;
  background-color: #F5FAFF;
}
.myChip{
  background: #E1E6EC !important;
}
</style>