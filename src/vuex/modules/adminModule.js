import { database } from "firebase";
import { firebaseAction } from 'vuexfire';
import moment from "moment";

export default {
  namespaced: true,
  state: {
    donationDetails: [],
    allHospitals: [],
    hospitalRequests: [],
    hospitalEvents: [],
    alert: {
      message: "",
      type: "success",
      dismissible: true,
      showAlert: false
    },
    dialogs: {
      hospitalDialog: {
        showDialog: false,
        hospitalProfile: {},
      },
      donorDetailsDialog: {
        showDialog: false,
        donorProfile: {}
      }
    },
    donorProfileMap: null,
    hospitalMap: null,
    leafletTile: {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }
  },
  mutations: {
    initalizeDonorProfileMap: (state) => {
      if (state.donorProfileMap) return
      state.donorProfileMap = L.map("donorProfileMap")
      L.tileLayer(
        state.leafletTile.url,
        {
          attribution: state.leafletTile.attribution,
          maxZoom: state.leafletTile.maxZoom,
        }
      ).addTo(state.donorProfileMap);
    },
    changeDonorDetailsLocation: (state, payload) => {
      state.donorProfileMap.setView([parseFloat(payload.lat), parseFloat(payload.lng)], 15);
      const icon = L.icon({
        iconUrl: require('../../assets/marker.png'),
        iconSize: [40, 40],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -90]
      })
      L.marker([parseFloat(payload.lat), parseFloat(payload.lng)], { icon: icon })
        .addTo(state.donorProfileMap)
    },
    initalizeHospitalMap: (state) => {
      if (state.hospitalMap) return
      state.hospitalMap = L.map("hospitalMap")
      L.tileLayer(
        state.leafletTile.url,
        {
          attribution: state.leafletTile.attribution,
          maxZoom: state.leafletTile.maxZoom,
        }
      ).addTo(state.hospitalMap);
    },
    changeHospitalLocation: (state, payload) => {
      state.hospitalMap.setView([parseFloat(payload.lat), parseFloat(payload.lng)], 15);
      const icon = L.icon({
        iconUrl: require('../../assets/marker.png'),
        iconSize: [40, 40],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -90]
      })
      L.marker([parseFloat(payload.lat), parseFloat(payload.lng)], { icon: icon })
        .addTo(state.hospitalMap)
    },
    showDonorDetailDialog: (state, showDialog) => {
      state.dialogs.donorDetailsDialog.showDialog = showDialog
    },
    showHospitalDialog: (state, showDialog) => {
      state.dialogs.hospitalDialog.showDialog = showDialog
    },
    setDonorProfile: (state, payload) => {
      state.dialogs.donorDetailsDialog.donorProfile = { ...payload }
    },
    setHospitalProfile: (state, payload) => {
      state.dialogs.hospitalDialog.hospitalProfile = { ...payload }
    },
  },
  getters: {
    getRequests: (state) => {
      return state.hospitalRequests.map(request => {
        request["date"] = {
          date: moment.unix(request.timestamp).format("Do"),
          day: moment.unix(request.timestamp).format("ddd"),
          monthYear: moment.unix(request.timestamp).format("MMM YYYY"),
        }
        return request
      })
    }
  },
  actions: {
    getDonorProfile: async ({ commit }, payload) => {
      try {
        const snapshot = await database().ref(`users/${payload.uid}`).once("value")
        commit("setDonorProfile", {
          ...payload,
          ...snapshot.val()
        });
        commit("showDonorDetailDialog", true);
      } catch (error) {
        console.log(error);
      }
    },
    getDonorDetails: firebaseAction(async ({ bindFirebaseRef }) => {
      return await bindFirebaseRef('donationDetails', database()
        .ref("donationDetails"))
    }),
    getHospitalProfile: async ({ commit, dispatch }, payload) => {
      commit("setHospitalProfile", {
        ...payload,
      });
      commit("showHospitalDialog", true);
      await dispatch("getRequests")
      await dispatch("getEvents")
      const { lat, lng } = payload
      commit("initalizeHospitalMap")
      commit("changeHospitalLocation", { lat, lng })
    },
    getAllHospitals: firebaseAction(async ({ bindFirebaseRef }) => {
      return await bindFirebaseRef('allHospitals', database()
        .ref("users")
        .orderByChild("role")
        .equalTo(1))
    }),
    getRequests: firebaseAction(({ state, bindFirebaseRef }) => {
      return bindFirebaseRef('hospitalRequests', database()
        .ref("requests")
        .orderByChild("uid")
        .equalTo(state.dialogs.hospitalDialog.hospitalProfile.uid))
    }),
    getEvents: firebaseAction(async ({ state, bindFirebaseRef }) => {
      return await bindFirebaseRef('hospitalEvents', database()
        .ref("events")
        .orderByChild("uid")
        .equalTo(state.dialogs.hospitalDialog.hospitalProfile.uid))
    }),
  }
}