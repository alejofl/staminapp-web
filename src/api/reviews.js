import { Api } from "./api.js";

export { ReviewsApi }
export { Review }

class ReviewsApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/reviews${ slug ? `/${slug}` : ""}`;
  }

  static async postReview(routineId, review, controller) {
    return await Api.post(ReviewsApi.getUrl(routineId), true, review, controller);
  }
}

class Review {
  constructor(score) {
    this.score = score;
    this.review = '';
  }
}