import { defineStore } from "pinia";
import { RoutinesApi } from "@/api/routines";

export const useRoutinesStore = defineStore("routines", {
  state: () => ({ }),
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
    }
  },
});