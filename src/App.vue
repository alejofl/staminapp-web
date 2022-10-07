<template>
  <v-app>
    <NavBar class="myNavBar"></NavBar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import ProfileCard from "@/components/ProfileCard";
import HomeCarousel from "@/components/HomeCarousel";
export default {
  components: { HomeCarousel, NavBar, ProfileCard },
  name: "App",
  data() {
    return {}
  },
};
</script>

<style>
.myNavBar {
  /*
    Without the position: absolute, scrolling in home page is inevitable.
  */
  position: absolute;
  width: 100%;
  z-index: 10;
}
</style>