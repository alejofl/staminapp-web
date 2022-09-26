<template>
  <div class="home">

<!--    <v-container class="fill-height">-->
<!--      <v-row class="no-gutters flex-wrap flex-column fill-height"><NavBar/></v-row>-->
<!--      <v-row class="no-gutters flex-wrap flex-column fill-height"><HomeCarousel/></v-row>-->
<!--    </v-container>-->
    <NavBar/>
    <HomeCarousel/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar";
import HomeCarousel from "@/components/HomeCarousel";
export default {
  name: "HomeView",
  components: { HomeCarousel, NavBar },
};
</script>

<style>

</style>
