import { defineStore } from "pinia";
import { RoutinesApi } from "@/api/routines";
import { DefaultRoutine } from "@/assets/default_data";

export const useRoutinesStore = defineStore("routines", {
  state: () => ({
    routine_data: JSON.parse(JSON.stringify(DefaultRoutine))
  }),
  getters: {
  },
  actions: {
    async create(routine) {
      return await RoutinesApi.postRoutine(routine);
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
    }
  },
});