<template>
<!--  <div class="home">-->
    <v-container fluid class="ma-0 pa-0">
      <HomeCarousel/>
<!--      <v-row no-gutters class="fill-height">-->
<!--        <v-col no-gutters cols="12">-->
<!--          -->
<!--        </v-col>-->
<!--      </v-row>-->
    </v-container>
<!--  </div>-->
<!--  <div class="fill-height">-->
<!--    <HomeCarousel/>-->
<!--  </div>-->

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
