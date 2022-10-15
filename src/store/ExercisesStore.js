import { defineStore } from "pinia";
import { ExercisesApi } from "@/api/exercises";

export const useExercisesStore = defineStore("exercise", {
  state: () => ({ exercises: [] }),
  getters: {
  },
  actions: {
    async create(exercise) {
      const result = await ExercisesApi.postExercise(exercise);
      this.exercises.push(result);
      return result;
    },

    async delete_exercise(exerciseId){
      const result = await ExercisesApi.deleteExercise(exerciseId);
      return result;
    },

    async updateExercise(exerciseId, exercise) {
      const result = await ExercisesApi.updateExercise(exerciseId, exercise);
      return result;
    },

    async getSavedExercises() {
      const result = await ExercisesApi.getSavedExercises();
      let i = 0;
      this.exercises = []
      for(i; i < result.totalCount; i++) {
        this.exercises.push({ id: result.content[i].id, name: result.content[i].name, detail: result.content[i].detail,
          type: result.content[i].type, metadata: result.content[i].metadata})
      }
      return result;
    },
  }
});