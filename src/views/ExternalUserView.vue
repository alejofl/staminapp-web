<template>
  <div class="myContainer pa-8">
    <h1 class="cera-pro" style="color: #001833">Username</h1>
    <v-row justify="start" class="pt-6">
      <v-col v-for="n in 6" :key="n" cols="12" sm="12" md="6" lg="3">
        <RoutineCard></RoutineCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RoutineCard from "@/components/RoutineCard";

export default {
  name: "ExternalUserView",
  components: { RoutineCard },
  data: () => {
    return {
      id: '',
    }
  }
};
</script>

<style scoped>
.myContainer {
  margin-top: 64px;
  background-color: #F5FAFF;
}
</style>