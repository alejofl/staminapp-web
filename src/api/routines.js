import { Api } from "./api.js";

export { RoutinesApi }
export { Routine }

class RoutinesApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`;
  }

  static async postRoutine(routine, controller) {
    return await Api.post(RoutinesApi.getUrl(), true, routine, controller);
  }

  static async getRoutine(id, controller) {
    return await Api.get(RoutinesApi.getUrl(id), true, controller);
  }

  static async getAllRoutines(controller) {
    return await Api.get(RoutinesApi.getUrl(), true, controller);
  }

  static async updateRoutine(id, routine, controller) {
    return await Api.put(RoutinesApi.getUrl(id), true, routine, controller);
  }

  static async deleteRoutine(id, controller) {
    return await Api.delete(RoutinesApi.getUrl(id), true, controller);
  }
}

class Routine {
  isPublic;

  constructor(name, detail, difficulty, metadata) {
    this.name = name;
    this.detail = detail;
    this.difficulty = difficulty;
    this.isPublic = true;
    this.category = null;
    this.metadata = metadata;
  }
}