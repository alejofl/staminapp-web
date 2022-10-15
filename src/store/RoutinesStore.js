import { defineStore } from "pinia";
import { Cycle, Routine, RoutinesApi } from "@/api/routines";
import { DefaultCycle, DefaultCycleExercise, DefaultRoutine, Difficulty } from "@/assets/default_data";
import { CyclesApi, CycleExercise } from "@/api/cycles";
import { FavouritesApi } from "@/api/favourites";

export const useRoutinesStore = defineStore("routines", {
  state: () => ({
    routine_data: JSON.parse(JSON.stringify(DefaultRoutine)),
    deleted_cycles: [],
    deleted_exercises: [],
  }),
  getters: {
  },
  actions: {
    async createRoutine() {
      let routine = new Routine(this.routine_data.name, this.routine_data.detail, Difficulty.for_api[this.routine_data.difficulty], {picture: this.routine_data.picture});
      let routine_result = await RoutinesApi.postRoutine(routine);
      if (routine_result.code) {
        throw routine_result;
      }
      for (let cycle_data of this.routine_data.cycles) {
        let cycle = new Cycle(cycle_data.name, cycle_data.order, cycle_data.repetitions);
        let cycle_result = await RoutinesApi.postCycle(routine_result.id, cycle);
        if (cycle_result.code) {
          throw cycle_result;
        }
        for (let exercise_data of cycle_data.exercises) {
          let ex = new CycleExercise(exercise_data.order, exercise_data.duration, exercise_data.repetitions);
          let ex_result = CyclesApi.postExercise(cycle_result.id, exercise_data.data.id, ex)
          if (ex_result.code) {
            throw ex_result;
          }
        }
      }
      return routine_result;
    },

    async get(id) {
      let response = JSON.parse(JSON.stringify(DefaultRoutine))
      let r_result = await RoutinesApi.getRoutine(id);
      if (r_result.code) {
        throw r_result;
      }

      response.id = r_result.id;
      response.name = r_result.name;
      response.detail = r_result.detail;
      response.score = r_result.score;
      response.difficulty =  Difficulty.for_web[r_result.difficulty];
      response.author = {id: r_result.user.id, username: r_result.user.username}
      response.picture = r_result.metadata.picture;

      let c_result = await RoutinesApi.getCycles(response.id);
      if (c_result.code) {
        throw c_result;
      }
      for (let c_data of c_result.content) {
        let cycle = JSON.parse(JSON.stringify(DefaultCycle));
        cycle.id = c_data.id;
        cycle.name = c_data.name;
        cycle.order = c_data.order;
        cycle.repetitions = c_data.repetitions;

        let e_result = await CyclesApi.getAllExercises(cycle.id);
        if (e_result.code) {
          throw e_result;
        }
        for (let e_data of e_result.content) {
          let ex = JSON.parse(JSON.stringify(DefaultCycleExercise));
          ex.data = {id: e_data.exercise.id, name: e_data.exercise.name};
          ex.order = e_data.order;
          ex.duration = e_data.duration;
          ex.repetitions = e_data.repetitions;
          cycle.exercises.push(ex);
        }

        response.cycles.push(cycle)
      }
      this.routine_data = response;
      this.deleted_cycles = [];
      this.deleted_exercises = [];
      return {success: 1}
    },

    async getAll() {
      return await RoutinesApi.getAllRoutines();
    },

    async update() {
      let routine = new Routine(this.routine_data.name, this.routine_data.detail, Difficulty.for_api[this.routine_data.difficulty], {picture: this.routine_data.picture});
      let routine_result = await RoutinesApi.updateRoutine(this.routine_data.id, routine);
      if (routine_result.code) {
        throw routine_result;
      }
      for (let cycle_data of this.routine_data.cycles) {
        let cycle = new Cycle(cycle_data.name, cycle_data.order, cycle_data.repetitions);
        let cycle_result = await RoutinesApi.updateCycle(this.routine_data.id, cycle_data.id, cycle);
        if (cycle_result.code) {
          throw cycle_result;
        }
        for (let exercise_data of cycle_data.exercises) {
          let ex = new CycleExercise(exercise_data.order, exercise_data.duration, exercise_data.repetitions);
          let ex_result = CyclesApi.updateExercise(cycle_data.id, exercise_data.data.id, ex)
          if (ex_result.code) {
            throw ex_result;
          }
        }
        for (let e of this.deleted_exercises) {
          let result = await CyclesApi.deleteExercise(e.cycle, e.exercise);
          if (result.code) {
            throw result
          }
        }
      }
      for (let c of this.deleted_cycles) {
        let result = await RoutinesApi.deleteCycle(this.routine_data.id, c)
        if (result.code) {
          throw result
        }
      }
      return {success: 1}
    },

    async delete(id) {
      return await RoutinesApi.deleteRoutine(id);
    },

    async getRoutinesForOtherUser(otherUserID) {
      return await RoutinesApi.getRoutinesForOtherUser(otherUserID);
    },

    async getFavourites() {
      return await FavouritesApi.getFavourites();
    },

    async markFavourite(id) {
      return await FavouritesApi.postFavourite(id);
    },

    async unmarkFavourite(id) {
      return await FavouritesApi.deleteFavourite(id);
    }
  },
});