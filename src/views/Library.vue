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

export default {
  name: "Library",
  components: { RoutineCard, RecentCard}
};
</script>

<style scoped>
.myContainer {
  position: absolute;
  width: 100%;
  top: 64px;
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