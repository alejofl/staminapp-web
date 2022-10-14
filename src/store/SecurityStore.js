import { defineStore } from "pinia";
import { UserApi } from "@/api/user";
import { Api } from "@/api/api";

const SECURITY_TOKEN_KEY = "security-token";

export const useSecurityStore = defineStore("security", {
  state: () => ({
    token: null,
    user: null,
    currentUser: { name: '', mail: '', gender: '', birthdate: '', weight: '', height: '', base64Data: '' },
  }),
  getters: {
    isLoggedIn() {
      return this.token != null;
    },
  },
  actions: {
    initialize() {
      const token = localStorage.getItem(SECURITY_TOKEN_KEY);
      if (token) {
        this.setToken(token);
      }
    },
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
      Api.token = token;
    },
    updateToken(token, rememberMe) {
      if (rememberMe)
        localStorage.setItem(SECURITY_TOKEN_KEY, token);
      // Después setea el token
      this.setToken(token);
    },
    removeToken() {
      localStorage.removeItem(SECURITY_TOKEN_KEY);
      this.setToken(null);
    },
    async login(credentials, rememberMe) {
      const result = await UserApi.login(credentials);
      this.updateToken(result.token, rememberMe);
    },
    async logout() {
      await UserApi.logout();
      this.removeToken();
    },
    async getCurrentUser() {
      if (this.user)
        return this.user;

      const result = await UserApi.get();
      this.setUser(result);
    },

    async resendEmailVerification(email) {
      await UserApi.postResendEmailVerification(email);
    },

    async createUser(userData) {
      await UserApi.postCreateUser(userData);
    },

    async updateProfileInfo(userData){
      await UserApi.updateProfileInfo(userData);
    },

    async getProfileInfo(){
      console.log("Entro al getProfile en Security Store")
      const result = await UserApi.getProfileInfo();
      console.log("result es igual a ")
      console.log(result)
      this.currentUser.name = result.firstName;
      this.currentUser.mail = result.email;
      this.currentUser.gender = result.gender;
      this.currentUser.birthdate = result.birthdate;
      // this.currentUser.weight = result.weight[0];
      // this.currentUser.height = result.height[0];
      //this.currentUser.base64Data = result.metadata.profilePicture;
      console.log("current user es igual a")
      console.log(this.currentUser)
      return result
    }
  },
});
