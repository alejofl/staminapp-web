<template>
  <HomeCarousel class="myCarousel"/>
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
.myCarousel {
  position: absolute;
  width: 100%;
  top: 0px;
}
</style>
