<template>
  <v-app>
    <NavBar/>
<!--    <RecentCard/>-->
    <v-content>
      <router-view/>
    </v-content>
<!--    <HomeCarousel />-->
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import RecentCard from "@/components/RecentCard";
import HomeCarousel from "@/components/HomeCarousel";
export default {
  components: { HomeCarousel, RecentCard, NavBar },
  name: "App",
  data() {
    return {}
  },
};
</script>
