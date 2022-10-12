import { Api } from "./api.js";

export { ExerciseApi, Exercise }

class ExerciseApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`;
  }

  static async get(controller) {
    return Api.get(ExerciseApi.getUrl('current'), true, controller);
  }

  static async postAddExercise(exercise, controller) {
    return Api.post(ExerciseApi.getUrl(''), false, {
      "name": "Jumping Jacks",
      "detail": "Jumping Jacks",
      "type": "exercise",
      "metadata": null
    }, controller);
  }
}

class Exercise{
  constructor(name,detail,type) {
    /*this.id = id;*/
    this.name = name;
    this.detail = detail;
    this.type = type;
    this.metadata = null
  }
}