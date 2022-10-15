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
      const result = await UserApi.getCurrent();
      return result;
    },

    async resendEmailVerification(email) {
      await UserApi.postResendEmailVerification(email);
    },

    async createUser(userData) {
      await UserApi.postCreateUser(userData);
    },

    async getUserInfo(id) {
      return await UserApi.getUserInfo(id);
    },
    
    async updateProfileInfo(userData){
      await UserApi.updateProfileInfo(userData);
    },

    async getCurrentUserRoutines() {
      return await UserApi.getCurrentUserRoutines();
    }
  },
});
