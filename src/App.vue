<template>
  <v-app>
    <NavBar />
    <CyclesCard/>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import CyclesCard from "@/components/CyclesCard";
export default {
  components: { CyclesCard, NavBar },
  name: "App",
  data() {
    return {}
  },
};
</script>
