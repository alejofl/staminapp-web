<template>
  <v-app>
    <NavBar class="myNavBar"></NavBar>
    <v-main>
      <router-view/>
    </v-main>
    <Footer v-if="!($route.fullPath === '/')"></Footer>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import RecentCard from "@/components/RecentCard";
import HomeCarousel from "@/components/HomeCarousel";
import Footer from "@/components/Footer";

export default {
  components: { Footer, HomeCarousel, RecentCard, NavBar },
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
