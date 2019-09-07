import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"

Vue.use(Vuex)

export default new Vuex.Store({
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
        await firebase.auth().signInWithEmailAndPassword(email, password)
        commit("buttonLoading", false)
      } catch (e) {
        console.log(e);
        commit("setAlertMessage", {
          showAlert: true,
          message: e.message,
          type: "error"
        })
        commit("buttonLoading", false)
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
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = firebase.auth().currentUser.uid
        const imageExtension = image.name.slice(image.name.lastIndexOf("."))
        const snapshot = await firebase.storage().ref("Hospital/" + uid + "/profileImage/" + "image." + imageExtension).put(image)
        const imageUrl = await snapshot.ref.getDownloadURL()
        await firebase.database().ref(`users/${uid}`).set(
          {
            ...getters.getLocationDetails,
            email,
            role: 1,
            phone,
            hname,
            imageUrl
          }
        )
        commit("buttonLoading", false)
        return
      } catch (e) {
        console.log(e);
        commit("setAlertMessage", {
          showAlert: true,
          message: e.message || e,
          type: "error"
        })
        commit("buttonLoading", false)
        return Promise.reject()
      }
    },
  }
})
