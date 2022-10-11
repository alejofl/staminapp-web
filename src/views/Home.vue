<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <h1 class="primary">Texto de prueba</h1>
    <CyclesCard></CyclesCard>
  </div>
</template>

<script>
// @ is an alias to /src
import CyclesCard from "@/components/CyclesCard";

export default {
  name: "HomeView",
  components: { CyclesCard }
};
</script>

<style>

</style>
