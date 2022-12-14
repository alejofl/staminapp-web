import { Api } from "./api.js";

export { RoutinesApi }
export { Routine, Cycle }

class RoutinesApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`;
  }

  static async postRoutine(routine, controller) {
    return await Api.post(RoutinesApi.getUrl(), true, routine, controller);
  }

  static async getRoutine(id, controller) {
    return await Api.get(RoutinesApi.getUrl(id), true, false, controller);
  }

  static async getAllRoutines(controller) {
    return await Api.get(RoutinesApi.getUrl(), true, true, controller);
  }

  static async updateRoutine(id, routine, controller) {
    return await Api.put(RoutinesApi.getUrl(id), true, routine, controller);
  }

  static async deleteRoutine(id, controller) {
    return await Api.delete(RoutinesApi.getUrl(id), true, controller);
  }

  static async postCycle(routineId, cycle, controller) {
    return await Api.post(RoutinesApi.getUrl(`${routineId}/cycles`), true, cycle, controller);
  }

  static async updateCycle(routineId, cycleId, cycle, controller) {
    return await Api.put(RoutinesApi.getUrl(`${routineId}/cycles/${cycleId}`), true, cycle, controller);
  }

  static async deleteCycle(routineId, cycleId, controller) {
    return await Api.delete(RoutinesApi.getUrl(`${routineId}/cycles/${cycleId}`), true, controller);
  }

  static async getCycles(routineId, controller) {
    return await Api.get(RoutinesApi.getUrl(`${routineId}/cycles`), true, true, controller);
  }

  static async getRoutinesForOtherUser(otherUserID, controller) {
    return await Api.get(RoutinesApi.getUrl(`?userId=${otherUserID}`), true, true, controller);
  }
}

class Routine {
  constructor(name, detail, difficulty, metadata) {
    this.name = name;
    this.detail = detail;
    this.difficulty = difficulty;
    this.isPublic = true;
    this.category = null;
    this.metadata = metadata;
  }
}

class Cycle {
  constructor(name, order, repetitions) {
    this.name = name;
    this.detail = "";
    this.type = "exercise";
    this.order = parseInt(order);
    this.repetitions = parseInt(repetitions);
    this.metadata = null;
  }
}