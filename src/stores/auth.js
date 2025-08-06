import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: sessionStorage.getItem("user") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userId: (state) => state.user,
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setUser(user) {
      this.user = user;
      sessionStorage.setItem("user", user);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});