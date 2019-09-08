import Vue from 'vue'
import Vuex from 'vuex'
import { auth, database, storage } from "firebase/app"

import HospitalModule from "./modules/hospitalModule"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hospitalModule: HospitalModule
  },
  state: {
    userDetails: {},
    locationDetails: {},
    buttonLoading: false,
    alert: {
      message: "",
      type: "success",
      showAlert: false
    },
    showDialogMap: false
  },
  mutations: {
    setUserDetails(state, payload) {
      state.userDetails = payload
    },
    setLocationDetails(state, payload) {
      state.locationDetails = payload
    },
    buttonLoading(state, isLoading) {
      state.buttonLoading = isLoading
    },
    showDialogMap(state, showDialog) {
      state.showDialogMap = showDialog
    },
    setAlertMessage(state, payload) {
      state.alert.showAlert = payload.showAlert || false
      state.alert.message = payload.message || ""
      state.alert.type = payload.type || "success"
    }
  },
  getters: {
    getLocationDetails: (state) => {
      return {
        place: state.locationDetails.label || "",
        lat: state.locationDetails.y || 0,
        lng: state.locationDetails.x || 0,
      }
    }
  },
  actions: {
    async firebaseLogin({ commit }, payload) {
      try {
        const { email, password } = payload
        commit("buttonLoading", true)
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        await auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        console.log(e);
        commit("setAlertMessage", {
          showAlert: true,
          message: e.message,
          type: "error"
        })
      } finally {
        commit("buttonLoading", false)
      }
    },
    async firebaseSignOut({ commit }) {
      try {
        await auth().signOut()
        commit("setUserDetails", {})
      } catch (e) {
        console.log("Error signing out ");
      }
    },
    async firebaseSignUp({ commit, getters }, payload) {
      try {
        commit("buttonLoading", true)
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        const { email, password, hname, phone, image } = payload
        if (hname === "" || phone === "") {
          throw "Please fill in all details"
        }
        else if (image === null) {
          throw "Please add a photo of the hospital"
        }
        else if (getters.getLocationDetails.place === "") {
          throw "Please set the location of the hospital"
        }
        await auth().createUserWithEmailAndPassword(email, password)
        const uid = auth().currentUser.uid
        const imageExtension = image.name.slice(image.name.lastIndexOf("."))
        const snapshot = await storage().ref("Hospital/" + uid + "/profileImage/" + "image." + imageExtension).put(image)
        const imageUrl = await snapshot.ref.getDownloadURL()
        await database().ref(`users/${uid}`).set(
          {
            ...getters.getLocationDetails,
            email,
            role: 1,
            phone,
            hname,
            imageUrl
          }
        )
        return
      } catch (e) {
        console.log(e);
        commit("setAlertMessage", {
          showAlert: true,
          message: e.message || e,
          type: "error"
        })
        return Promise.reject()
      } finally {
        commit("buttonLoading", false)
      }
    },
  }
})
