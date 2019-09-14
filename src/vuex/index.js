import { initializeApp, auth, database, storage } from "firebase/app";
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import HospitalModule from "./modules/hospitalModule";
import router from "../routes"
import { async } from "q";

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
    showDialogMap: false,
    leafletTile: {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }
  },
  mutations: {
    initializeAuthMap: (state) => {
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
          state.leafletTile.url,
          {
            attribution: state.leafletTile.attribution,
            maxZoom: state.leafletTile.maxZoom,
          }
        ).addTo(state.authMap);
      });
    },
    setUserDetails: (state, payload) => {
      state.userDetails = { ...state.userDetails, ...payload }
    },
    setLocationDetails: (state, payload) => {
      state.locationDetails = { ...payload }
    },
    buttonLoading: (state, isLoading) => {
      state.buttonLoading = isLoading
    },
    showDialogMap: (state, showDialog) => {
      state.showDialogMap = showDialog
    },
    setAlertMessage: (state, payload) => {
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
    initializeFirebase: ({ dispatch }) => {
      initializeApp({
        apiKey: "AIzaSyDYu49q4dCwqqiXtX-T6ebGVSq9PwH3M18",
        authDomain: "elite-span-131415.firebaseapp.com",
        databaseURL: "https://elite-span-131415.firebaseio.com",
        projectId: "elite-span-131415",
        storageBucket: "elite-span-131415.appspot.com",
        messagingSenderId: "1064937901507",
        appId: "1:1064937901507:web:56aeb80122c8bbd1"
      });
      dispatch("authStateListener")
    },
    authStateListener: async ({ commit }) => {
      auth().onAuthStateChanged(async (user) => {
        try {
          commit("buttonLoading", true)
          if (user) {
            const { email, emailVerified, uid } = user
            commit("setUserDetails", {
              email,
              emailVerified,
              uid
            })
            if (!emailVerified) {
              commit("hospitalModule/setAlertMessage", {
                showAlert: true,
                message: "An email verification link has been sent to your email address, please verify account",
                type: "warning",
              })
            }
            console.log("user exists");
            const snapshot = await database().ref(`users/${uid}`).once("value")
            commit("setUserDetails", {
              ...snapshot.val()
            })
            if (snapshot.val().role === 1) {
              await router.replace("/hospital")
            } else {
              await router.replace("/admin")
            }
          } else {
            console.log("user does not exist");
            await router.replace("/")
          }
        } catch (e) {
          console.log(e);
        } finally {
          commit("buttonLoading", false)
        }
      })
    },
    firebaseLogin: async ({ commit }, payload) => {
      try {
        const { email, password } = payload
        commit("buttonLoading", true)
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        await auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit("setAlertMessage", {
          showAlert: true,
          message: e.message,
          type: "error"
        })
      } finally {
        commit("buttonLoading", false)
      }
    },
    firebaseSignOut: async ({ commit }) => {
      try {
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        await auth().signOut()
        commit("setUserDetails", {})
      } catch (e) {
        commit("setAlertMessage", {
          showAlert: true,
          message: "There was en error signing out",
          type: "error"
        })
      }
    },
    firebaseSignUp: async ({ commit, getters }, payload) => {
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
        const snapshot = await storage().ref(`Hospital/${uid}/profileImage/image.${imageExtension}`).put(image)
        const imageUrl = await snapshot.ref.getDownloadURL()
        await database().ref(`users/${uid}`).set(
          {
            email,
            role: 1,
            phone,
            hname,
            imageUrl,
            ...getters.getLocationDetails
          }
        )
        await router.replace("/hospital")
      } catch (e) {
        commit("setAlertMessage", {
          showAlert: true,
          message: e.message || e,
          type: "error"
        })
      } finally {
        commit("buttonLoading", false)
      }
    }
  }
})
