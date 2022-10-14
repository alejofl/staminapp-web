import { defineStore } from "pinia";
import { Exercises, ExercisesApi } from "@/api/exercises";

export const useExercisesStore = defineStore("exercise", {
  state: () => ({ exercises: [] }),
  getters: {
  },
  actions: {
    async create(exercise) {
      console.log("Entre al store");
      const result = await ExercisesApi.postExercise(exercise);
      console.log("Despues del await antes del push");
      this.exercises.push(result);
      console.log("Estoy en el store" + result);
      console.log(this.exercises);
      return result;
    },

    async delete_exercise(exerciseId){
      const result = await ExercisesApi.deleteExercise(exerciseId);
      return result;
    },

    async updateExercise(exerciseId, exercise) {
      console.log("Entre al store y estoy por updetear")
      const result = await ExercisesApi.updateExercise(exerciseId, exercise);
      return result;
    },

    async getSavedExercises() {
      console.log("Entre a saved exercise store")
      const result = await ExercisesApi.getSavedExercises();
      console.log("Sali del exercises Apu en el exercises store")
      console.log(result);
      let i = 0;
      for(i; i < result.totalCount; i++) {
        this.exercises.push({ id: result.content[i].id, name: result.content[i].name, detail: result.content[i].detail,
          type: result.content[i].type, metadata: result.content[i].metadata})
      }
      return result;
    },
  }
});