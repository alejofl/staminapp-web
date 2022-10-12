<template>
  <HomeCarousel class="myCarousel"/>
</template>

<script>
// @ is an alias to /src
import HomeCarousel from "@/components/HomeCarousel";
export default {
  name: "HomeView",
  components: { HomeCarousel },
};
</script>

<style>
.myCarousel {
  position: absolute;
  width: 100%;
  top: 0;
}
</style>
