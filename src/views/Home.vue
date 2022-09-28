<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <h1 class="primary">Texto de prueba</h1>
    <RoutineCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import RoutineCard from "@/components/RoutineCard";
export default {
  name: "HomeView",
  components: {RoutineCard},
};
</script>

<style>

</style>
