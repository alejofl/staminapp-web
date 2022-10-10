import { Api } from "./api.js";

export { UserApi, Credentials, UserData, MetaData }

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

  static async postCreateUser(userData, controller) {
    return Api.post(UserApi.getUrl(''), false, userData, controller);
  }
}

class Credentials {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

class UserData {
  constructor(username, password, firstName, lastName, gender, birthdate, email, phone, avatarUrl, metadata) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.birthdate = birthdate;
    this.phone = phone;
    this.avatarUrl = avatarUrl;
    this.metadata = metadata;
  }
}

class MetaData {
  constructor(weight, height) {
    this.weight = weight;
    this.height = height;
  }
}