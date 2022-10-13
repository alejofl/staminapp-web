import { Api } from "./api.js";

export { ExercisesApi }
export { Exercise }

// Si vamos a la API, tenemos un apartado que es para deportes y este sera como una api
// pequeña.

class ExercisesApi {
  static getUrl(slug) {
    // Si el slug es vacio entonces pongo vacio sino el slug.
    //
    return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`;
  }
  //
  // static async getAll(controller) {
  //   return await Api.get(ExercisesApi.getUrl(), true, controller);
  // }

  static async postExercise(exercise, controller) {
    return await Api.post(ExercisesApi.getUrl(), true, exercise, controller);
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