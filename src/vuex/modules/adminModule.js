import { auth, database, storage } from "firebase";
import { firebaseAction } from 'vuexfire';

export default {
  namespaced: true,
  state: {
    donationDetails: [],
    alert: {
      message: "",
      type: "success",
      dismissible: true,
      showAlert: false
    },
    dialogs: {
      allHospitalsDialog: {
        showDialog: false
      },
      donorDetailsDialog: {
        showDialog: false,
        donorProfile: {}
      }
    },
    donorProfileMap: null,
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
    showDonorDetailDialog: (state, showDialog) => {
      state.dialogs.donorDetailsDialog.showDialog = showDialog
    },
    setDonorProfile: (state, payload) => {
      state.dialogs.donorDetailsDialog.donorProfile = { ...payload }
    },
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
    getDonorDetails: firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef('donationDetails', database()
        .ref("donationDetails"))
    }),
  }
}