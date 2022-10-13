import { defineStore } from "pinia";
import { Exercises, ExercisesApi } from "@/api/exercises";

export const useExercisesStore = defineStore("exercise", {
  state: () => ({ }),
  getters: {
  },
  actions: {
    async create(exercise) {
      const result = await ExercisesApi.postExercise(exercise);
      return result;
    },

    async delete_exercise(exerciseId){
      const result = await ExercisesApi.deleteExercise(exerciseId)
      return result
    }
  },
});