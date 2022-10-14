import { defineStore } from "pinia";
import { Cycle, Routine, RoutinesApi } from "@/api/routines";
import { DefaultRoutine, Difficulty } from "@/assets/default_data";
import { CyclesApi, Exercise } from "@/api/cycles";
import { Api } from "@/api/api";

export const useRoutinesStore = defineStore("routines", {
  state: () => ({
    routine_data: JSON.parse(JSON.stringify(DefaultRoutine))
  }),
  getters: {
  },
  actions: {
    async createRoutine() {
      let routine= new Routine(this.routine_data.name, this.routine_data.detail, Difficulty.for_api[this.routine_data.difficulty], {picture: this.routine_data.picture});
      let routine_result = await RoutinesApi.postRoutine(routine);
      if (routine_result.code) {
        return routine_result;
      }
      for (let cycle_data of this.routine_data.cycles) {
        let cycle = new Cycle(cycle_data.name, cycle_data.order, cycle_data.repetitions);
        let cycle_result = await RoutinesApi.postCycle(routine_result.id, cycle);
        if (cycle_result.code) {
          return cycle_result;
        }
        for (let exercise_data of cycle_data.exercises) {
          let ex = new Exercise(exercise_data.order, exercise_data.duration, exercise_data.repetitions);
          let ex_result =  CyclesApi.postExercise(cycle_result.id, exercise_data.id, ex)
          if (ex_result.code) {
            return ex_result;
          }
        }
      }
      return routine_result;
    },

    async get(id) {
      return await RoutinesApi.getRoutine(id);
    },

    async getAll() {
      return await RoutinesApi.getAllRoutines();
    },

    async update(id, routine) {
      return await RoutinesApi.updateRoutine(id, routine);
    },

    async delete(id) {
      return await RoutinesApi.deleteRoutine(id);
    },

    async createCycle(routineId, cycle) {
      return await RoutinesApi.postCycle(routineId, cycle);
    },

    async getRoutinesForOtherUser(otherUserID) {
      return await RoutinesApi.getRoutinesForOtherUser(otherUserID);
    },

    async getRoutinesForDifficulty(difficulty) {
      return await RoutinesApi.getRoutinesForDifficulty(difficulty);
    }
  },
});