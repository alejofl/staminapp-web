import { defineStore } from "pinia";
import { Exercises, ExercisesApi } from "@/api/exercises";

export const useExercisesStore = defineStore("exercise", {
  state: () => ({ }),
  getters: {
  },
  actions: {
    // async getAll(controller) {
    //   const result = await ExercisesApi.getAll(controller);
    //   return result;
    // },
    async create(exercise) {
      const result = await ExercisesApi.postExercise(exercise);
      return result;
    }
  },
});