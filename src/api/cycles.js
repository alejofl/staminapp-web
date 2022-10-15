import { Api } from "./api.js";

export { CyclesApi }
export { CycleExercise }

class CyclesApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/cycles${ slug ? `/${slug}` : ""}`;
  }

  static async postExercise(cycleId, exerciseId, data, controller) {
    return await Api.post(CyclesApi.getUrl(`${cycleId}/exercises/${exerciseId}`), true, data, controller);
  }

  static async getExercise(cycleId, exerciseId, controller) {
    return await Api.get(CyclesApi.getUrl(`${cycleId}/exercises/${exerciseId}`), true, false, controller);
  }

  static async getAllExercises(cycleId, controller) {
    return await Api.get(CyclesApi.getUrl(`${cycleId}/exercises`), true, true, controller);
  }

  static async updateExercise(cycleId, exerciseId, data, controller) {
    return await Api.put(CyclesApi.getUrl(`${cycleId}/exercises/${exerciseId}`), true, data, controller);
  }

  static async deleteExercise(cycleId, exerciseId, controller) {
    return await Api.delete(CyclesApi.getUrl(`${cycleId}/exercises/${exerciseId}`), true, false, controller);
  }
}

class CycleExercise {
  constructor(order, duration, repetitions) {
    this.order = parseInt(order);
    this.duration = duration === null ? 0 : parseInt(duration);
    this.repetitions = repetitions === null ? 0 : parseInt(repetitions);
  }
}