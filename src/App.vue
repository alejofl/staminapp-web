<template>
  <v-app>
    <NavBar />
    <ExercisesCard/>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import ExercisesCard from "@/components/ExercisesCard";
export default {
  components: { ExercisesCard, NavBar },
  name: "App",
  data() {
    return {}
  },
};
</script>
