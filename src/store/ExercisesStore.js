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
    }
  }
});