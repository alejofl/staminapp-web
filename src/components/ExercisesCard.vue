<template>
  <!--<v-card elevation="2" color="#E1E6EC" v-show="show" width="368px" height="96px" max-height="100%" class="exercise-card">-->
  <v-flex>
    <v-card class="exercise-card" color=#E1E6EC v-show="show">
      <v-card-title class="secondary--text font-weight-bold">
        Ejercicio
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="secondary">edit</v-icon>
        </v-btn>
        <v-btn icon @click="show=false">
          <v-icon color="error">delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="secondary--text grow">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis tincidunt nibh. Aliquam accumsan interdum nibh.
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "ExercisesCard",
  data() {
    return {
      show:true,
    }
  },
  methods: {
  },
};
</script>

<style>
.exercise-card{
  display: flex;
  flex-direction: column;
  width: 368px;
}
</style>
