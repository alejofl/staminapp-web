<template>
  <v-app>
    <NavBar class="myNavBar"></NavBar>
    <v-main>
      <router-view/>
    </v-main>
    <Footer
      v-if="!($route.fullPath === '/' ||
            ['sign-up', 'sign-in'].some((e) => $route.fullPath.includes(e)))">
    </Footer>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useSecurityStore } from "@/store/SecurityStore";

export default {
  components: { Footer, NavBar },
  name: "App",
  data() {
    return {}
  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
  }
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
