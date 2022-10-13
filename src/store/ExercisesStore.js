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

    async getProfileInfo(){
      const result = await ExercisesApi.getProfileInfo();
      return result;
    }
  },
});