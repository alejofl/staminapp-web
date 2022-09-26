<template>
  <div class="home">
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
