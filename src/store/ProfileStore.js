import { defineStore } from "pinia";
import { ExerciseApi } from "@/api/exercise";
import { Api } from "@/api/api";

const SECURITY_TOKEN_KEY = "security-token";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    token: null,
    user: null
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

    async addExercise(exercise){
      await ExerciseApi.postAddExercise(exercise);
    }
  },
});