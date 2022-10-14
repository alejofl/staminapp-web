import { Api } from "./api.js";
import { UserApi } from "@/api/user";

export { ExercisesApi }
export { Exercise }

class ExercisesApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`;
  }
  // El controller es algo del timeout
  static async postExercise(exercise, controller) {
    return await Api.post(ExercisesApi.getUrl(), true, exercise, controller);
  }

  static async deleteExercise(exerciseId, controller) {
    return await Api.delete(ExercisesApi.getUrl(exerciseId), true, controller);
  }

  static async updateExercise(exerciseId, exercise, controller) {
    console.log("Entre al exerciseApi y estoy por updatear")
    return await Api.put(ExercisesApi.getUrl(exerciseId),true, exercise, controller);
  }

  static async getSavedExercises(controller) {
    console.log("Entre al exercises.js antes de api")
    return await Api.get(ExercisesApi.getUrl(), true, true, controller);
  }
}

class Exercise {
  constructor(name, detail, type, metadata) {
    this.name = name;
    this.detail = detail;
    this.type = type;
    this.metadata = null;
  }
}