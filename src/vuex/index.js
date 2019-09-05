import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    buttonLoading: false,
    alert: {
      message: "",
      type: "success",
      showAlert: false
    }
  },
  mutations: {
    buttonLoading(state, isLoading) {
      state.buttonLoading = isLoading
    },
    setAlertMessage(state, payload) {
      state.alert.showAlert = payload.showAlert || false
      state.alert.message = payload.message || ""
      state.alert.type = payload.type || "success"
    }
  },
  actions: {
    async firebaseLogin({ commit }, payload) {
      try {
        commit("buttonLoading", true)
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        commit("buttonLoading", false)
        console.log("success");
      } catch (e) {
        console.log(e);
        commit("setAlertMessage", {
          showAlert: true,
          message: e.message,
          type: "error"
        })
        commit("buttonLoading", false)
      }
    }
  }
})
