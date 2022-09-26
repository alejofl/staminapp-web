<template>
  <v-app>
    <NavBar />
    <ProfileCard/>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import ProfileCard from "@/components/ProfileCard";
export default {
  components: { NavBar, ProfileCard },
  name: "App",
  data() {
    return {}
  },
};
</script>
