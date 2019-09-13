import { auth, database, storage } from "firebase/app";
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import HospitalModule from "./modules/hospitalModule";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hospitalModule: HospitalModule
  },
  state: {
    userDetails: {},
    locationDetails: {},
    authMap: null,
    chosenLocation: {
      label: "No location chosen",
      type: "warning"
    },
    buttonLoading: false,
    alert: {
      message: "",
      type: "success",
      showAlert: false
    },
    showDialogMap: false
  },
  mutations: {
    initializeAuthMap(state) {
      if (state.authMap) return
      state.authMap = L.map("authMap")
      navigator.geolocation.getCurrentPosition(location => {
        state.authMap.setView([location.coords.latitude, location.coords.longitude], 12);
        const addMarker = ({ x, y }) => {
          const icon = L.icon({
            iconUrl: require('../assets/marker.png'),
            iconSize: [40, 40],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -90]
          })
          L.marker([y, x], { icon: icon })
            .addTo(state.authMap)
        }
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
          provider: provider,
          showMarker: true,
          marker: {
            icon: new L.Icon.Default(),
            draggable: false,
          },
          autoClose: true,
          retainZoomLevel: true,
          popupFormat: ({ result }) => {
            addMarker(result)
            state.chosenLocation.label = result.label
            state.chosenLocation.type = "success"
            state.locationDetails = { ...result }
            setTimeout(() => {
              state.showDialogMap = false
              state.locationDetails = result
            }, 2000);
          },
        });
        state.authMap.addControl(searchControl);
        L.circle([location.coords.latitude, location.coords.longitude], { radius: 5000 }).addTo(state.authMap);
        L.tileLayer(
          "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18,
          }
        ).addTo(state.authMap);
      });
    },
    setUserDetails(state, payload) {
      state.userDetails = { ...state.userDetails, ...payload }
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
    },
    ...vuexfireMutations
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
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        await auth().signOut()
        commit("setUserDetails", {})
      } catch (e) {
        console.log("Error signing out");
        commit("setAlertMessage", {
          showAlert: true,
          message: "There was en error signing out",
          type: "error"
        })
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
        await auth().currentUser.sendEmailVerification()
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
