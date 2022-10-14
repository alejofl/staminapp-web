import { Api } from "./api.js";

export { UserApi, Credentials, UserData, MetaData, UpdatedUserData }

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

  static async getCurrent(controller) {
    return Api.get(UserApi.getUrl('current'), true, true, controller);
  }

  static async postResendEmailVerification(email, controller) {
    return Api.post(UserApi.getUrl('resend_verification'), false, { "email": email }, controller);
  }

  static async postCreateUser(userData, controller) {
    return Api.post(UserApi.getUrl(''), false, userData, controller);
  }

  static async getUserInfo(id, controller) {
    return Api.get(UserApi.getUrl(id), true, false, controller)
  }

  static async verify_user(user, controller) {
    return Api.post(UserApi.getUrl('verify_email'), false, user, controller)
  }

  static async updateProfileInfo(updatedUserData, controller) {
    console.log("Entre al user api");
    console.log(updatedUserData);
    return Api.put(UserApi.getUrl('current'),true, updatedUserData, controller)
  }

  static async getProfileInfo(controller){
    console.log("llego al getprofile del user.js")
    return Api.get(UserApi.getUrl('current'), true, true, controller);
  }
}



class Credentials {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

class UserData {
  constructor(password, name, gender, birthdate, email, metadata) {
    this.username = email;
    this.password = password;
    this.firstName = name;
    this.lastName = '';
    if (gender !== '') {
      this.gender = gender;
    }
    if (birthdate !== '') {
      this.birthdate = parseInt(birthdate, 10);
    }
    this.email = email;
    this.phone = '';
    this.avatarUrl = '';
    this.metadata = metadata;
  }
}
class MetaData {
  constructor(weight, height, profilePicture) {
    this.weight = [];
    this.weight.push(weight);
    this.height = [];
    this.height.push(height);
    this.profilePicture = profilePicture;
  }
}

class UpdatedUserData{
  constructor(firstName, lastName, gender, birthdate, phone, avatarUrl, metadata){
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.birthdate = birthdate;
    this.phone = phone;
    this.avatarUrl = avatarUrl;
    this.metadata = metadata;
  }
}