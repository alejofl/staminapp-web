<template>
  <!--<v-card elevation="2" color="#E1E6EC" v-show="show" width="368px" height="96px" max-height="100%" class="exercise-card">-->
  <v-flex>
    <v-card class="exercise-card" color=#E1E6EC v-show="show" outlined>
      <v-card-title class="secondary--text font-weight-bold">
        <div v-show="!show_editable_exercise_name">{{exercise_name}}</div>
        <v-text-field v-model="exercise_name" v-show="show_editable_exercise_name"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="secondary" @click="show_editable_exercise_name=!show_editable_exercise_name; show_editable_exercise_description=!show_editable_exercise_description" >edit</v-icon>
        </v-btn>
        <v-btn icon @click="show=false">
          <v-icon color="error">delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="secondary--text grow">
        <div v-show="!show_editable_exercise_description">{{exercise_description}}</div>
        <v-textarea v-model="exercise_description" v-show="show_editable_exercise_description"></v-textarea>
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
      exercise_name:'Ejercicio sin nombre',
      exercise_description:"Inserte descripción...",
      show_editable_exercise_name:false,
      show_editable_exercise_description:false,
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
