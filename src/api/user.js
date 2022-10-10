import { Api } from "./api.js";

export { UserApi, Credentials }

class UserApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/users${ slug ? `/${slug}` : ""}`;
  }

  static async login(credentials, controller) {
    return await Api.post(UserApi.getUrl('login'), false, credentials, controller);
  }

  static async logout(controller) {
    await Api.post(UserApi.getUrl('logout'), true, controller);
  }

  static async get(controller) {
    return Api.get(UserApi.getUrl('current'), true, controller);
  }

  static async postResendEmailVerification(email, controller) {
    return Api.post(UserApi.getUrl('resend_verification'), false, { "email": email }, controller);
  }

  static async get_user_info(id, controller) {
    return Api.get(UserApi.getUrl(id), false, controller)
  }

  static async verify_user(user, controller) {
    return Api.post(UserApi.getUrl('verify_email'), false, user, controller)
  }
}

class Credentials {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}