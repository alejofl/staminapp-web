import { defineStore } from "pinia";
import { Cycle, Routine, RoutinesApi } from "@/api/routines";
import { DefaultCycle, DefaultCycleExercise, DefaultRoutine, Difficulty } from "@/assets/default_data";
import { CyclesApi, CycleExercise } from "@/api/cycles";
import { FavouritesApi } from "@/api/favourites";
import { Review, ReviewsApi } from "@/api/reviews";

export const useRoutinesStore = defineStore("routines", {
  state: () => ({
    routine_data: JSON.parse(JSON.stringify(DefaultRoutine)),
    before_change_data: null,
    deleted_cycles: [],
  }),
  getters: {
  },
  actions: {
    async initialize() {
      this.routine_data = JSON.parse(JSON.stringify(DefaultRoutine));
      this.before_change_data = null;
      this.deleted_cycles = [];
    },

    async createRoutine() {
      let routine = new Routine(this.routine_data.name, this.routine_data.detail, Difficulty.for_api[this.routine_data.difficulty], {picture: this.routine_data.picture});
      let routine_result = await RoutinesApi.postRoutine(routine);
      if (routine_result.code) {
        throw routine_result;
      }

      for (let i = 0; i < this.routine_data.cycles.length; i++) {
        let cycle_data = this.routine_data.cycles[i];

        let cycle = new Cycle(cycle_data.name, i+1, cycle_data.repetitions);
        let cycle_result = await RoutinesApi.postCycle(routine_result.id, cycle);
        if (cycle_result.code) {
          throw cycle_result;
        }

        for (let j = 0; j < cycle_data.exercises.length; j++) {
          let exercise_data = cycle_data.exercises[j];

          let ex = new CycleExercise(j+1, exercise_data.duration, exercise_data.repetitions);
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
          if (ex.repetitions > 0) {
            if (ex.duration > 0) {
              ex.type = 2;
            } else {
              ex.type = 0;
            }
          } else {
            ex.type = 1;
          }
          cycle.exercises.push(ex);
        }

        response.cycles.push(cycle)
      }
      this.routine_data = response;
      this.before_change_data = JSON.parse(JSON.stringify(response));
      this.deleted_cycles = [];
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

      for (let c of this.before_change_data.cycles) {
        for (let e of c.exercises) {
          let ex_result = CyclesApi.deleteExercise(c.id, e.data.id)
          if (ex_result.code) {
            throw ex_result;
          }
        }
      }
      for (let c of this.deleted_cycles) {
        let result = await RoutinesApi.deleteCycle(this.routine_data.id, c)
        if (result.code) {
          throw result
        }
      }

      for (let i = 0; i < this.routine_data.cycles.length; i++) {
        let cycle_data = this.routine_data.cycles[i];

        let cycle_id = cycle_data.id;
        let cycle = new Cycle(cycle_data.name, i+1, cycle_data.repetitions);
        if (cycle_id === null) {
          let new_cycle_result = await RoutinesApi.postCycle(this.routine_data.id, cycle);
          if (new_cycle_result.code) {
            throw new_cycle_result;
          }
          cycle_id = new_cycle_result.id;
        } else {
          let cycle_result = await RoutinesApi.updateCycle(this.routine_data.id, cycle_id, cycle);
          if (cycle_result.code) {
            throw cycle_result;
          }
        }

        for (let j = 0; j < cycle_data.exercises.length; j++) {
          let exercise_data = cycle_data.exercises[j];

          let ex = new CycleExercise(j+1, exercise_data.duration, exercise_data.repetitions);
          let ex_result = CyclesApi.postExercise(cycle_id, exercise_data.data.id, ex)
          if (ex_result.code) {
            throw ex_result;
          }
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
    },

    async rate(id, score) {
      return await ReviewsApi.postReview(id, new Review(score));
    }
  },
});