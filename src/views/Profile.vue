<template>
  <v-flex>
    <v-container class="profile-style">
      <v-row>
        <v-col md="4" lg="4">
          <ProfileCard></ProfileCard>
        </v-col>
        <v-col md="8" lg="8">
            <h1 class="cera-pro">MIS EJERCICIOS</h1>
            <v-spacer></v-spacer>
            <v-btn icon large><v-icon large color="secondary">add</v-icon></v-btn>
          <v-container class="exercises-container-style">
      <v-row
      v-for="n in 12"
      :key="n"
      class="mb-12">
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          sm="12"
          md="4"
          lg="4"
        >
          <ExercisesCard></ExercisesCard>
        </v-col>
      </v-row>
    </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-flex>
</template>

<script>
import ProfileCard from "@/components/ProfileCard";
import ExercisesCard from "@/components/ExercisesCard";
export default {
  name: "Profile",
  components: { ExercisesCard, ProfileCard }
};
</script>

<style scoped>
  .profile-style{
    position:absolute;
    width: 100%;
    top: 64px;
  }
  .exercises-container-style{
    width: 100%;
    position: absolute;
  }
</style>