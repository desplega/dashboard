import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Globals from "./globalConstants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem(Globals.API_AUTH_TOKEN) || "",
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, payload) {
      state.status = "success";
      state.token = payload.token;
      state.refreshToken = payload.refreshToken,
      state.user = payload.user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: Globals.BASE_API_URL + "auth/local",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const refreshToken = resp.data['refresh-token'];
            const user = resp.data.user;
            localStorage.setItem(Globals.API_AUTH_TOKEN, token);
            localStorage.setItem(Globals.API_REFRESH_TOKEN, refreshToken);
            // Configure default headers for all htpp calls
            axios.defaults.headers.common["access-token"] = token;
            axios.defaults.headers.common["refresh-token"] = refreshToken;
            axios.defaults.headers.common["Content-Type"] = "application/json";
            // Resolve promise
            commit("auth_success", { token, user });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem(Globals.API_AUTH_TOKEN);
            localStorage.removeItem(Globals.API_REFRESH_TOKEN);
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: Globals.BASE_API_URL + "api/v1/users",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const refreshToken = resp.data['refresh-token'];
            const user = resp.data.user;
            localStorage.setItem(Globals.API_AUTH_TOKEN, token);
            localStorage.setItem(Globals.API_REFRESH_TOKEN, refreshToken);
            // Configure default headers for all http calls
            axios.defaults.headers.common["access-token"] = token;
            axios.defaults.headers.common["refresh-token"] = refreshToken;
            axios.defaults.headers.common["Content-Type"] = "application/json";
            // Resolve promise
            commit("auth_success", { token, user });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            localStorage.removeItem("refresh-token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem(Globals.API_AUTH_TOKEN);
        localStorage.removeItem(Globals.API_REFRESH_TOKEN);
        delete axios.defaults.headers.common["access-token"];
        delete axios.defaults.headers.common["refresh-token"];
        delete axios.defaults.headers.common["Content-Type"];
        resolve();
      });
    },
    initAuthentication({ commit }) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        const token = localStorage.getItem(Globals.API_AUTH_TOKEN) || "";
        const refreshToken = localStorage.getItem(Globals.API_REFRESH_TOKEN) || "";
        // If no tokens go to Login page
        if (!token || !refreshToken) {
          commit("logout");
          resolve();
        } else {
          // Configure default headers for all htpp calls
          axios.defaults.headers.common["access-token"] = token;
          axios.defaults.headers.common["refresh-token"] = refreshToken;
          axios.defaults.headers.common["Content-Type"] = "application/json";
          // If there are tokens, confirm they are valid (I need to do a call to test the tokens, i.e. /users/me)
          axios({
            url: Globals.BASE_API_URL + "api/v1/users/me",
            method: "GET"
          })
            .then(resp => {
              const user = resp.data;
              commit("auth_success", { token, refreshToken, user });
              resolve(resp);
            })
            .catch(err => {
              commit("auth_error");
              localStorage.removeItem(Globals.API_AUTH_TOKEN);
              localStorage.removeItem(Globals.API_REFRESH_TOKEN);
              reject(err);
            });
        }
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    token: state => state.token
  }
});
