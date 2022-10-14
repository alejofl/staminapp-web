import { Api } from "./api.js";

export { FavouritesApi }

class FavouritesApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/favourites${ slug ? `/${slug}` : ""}`;
  }

  static async postFavourite(routineId, controller) {
    return await Api.post(FavouritesApi.getUrl(routineId), true, null, controller);
  }

  static async getFavourites(controller) {
    return await Api.get(FavouritesApi.getUrl(), true, true, controller);
  }

  static async deleteFavourite(routineId, controller) {
    return await Api.delete(FavouritesApi.getUrl(routineId), true, controller);
  }
}