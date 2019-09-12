import { auth, database, storage } from "firebase";
import { GeoFire } from "geofire";
import L from 'leaflet';
import moment from "moment";
import { firebaseAction } from 'vuexfire';

export default {
  namespaced: true,
  state: {
    requests: [],
    events: [],
    donationDetails: [],
    addButton: {
      type: 1,
      name: "Add Request"
    },
    alert: {
      message: "",
      type: "success",
      dismissible: true,
      showAlert: false
    },
    dialogs: {
      addRequestDailog: {
        showDialog: false
      },
      closeRequestDialog: {
        showDialog: false
      },
      addEventDailog: {
        showDialog: false
      },
      closeEventDialog: {
        showDialog: false
      }
    },
    eventMap: null
  },
  mutations: {
    initalizeEventMap(state) {
      state.eventMap = L.map("eventMap")
      navigator.geolocation.getCurrentPosition(location => {
        state.eventMap.setView([location.coords.latitude, location.coords.longitude], 12);
        L.circle([location.coords.latitude, location.coords.longitude], { radius: 300 }).addTo(state.eventMap);
        L.tileLayer(
          "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18,
          }
        ).addTo(state.eventMap);
      });
    },
    changeLocation(state, payload) {
      state.eventMap.setView([payload.lat, payload.lng], 12)
      const icon = L.icon({
        iconUrl: require('../../assets/marker.png'),
        iconSize: [40, 40],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -90]
      })
      L.marker([payload.lat, payload.lng], { icon: icon })
        .addTo(state.eventMap)
        .bindPopup(payload.eventName)
        .openPopup();
    },
    changeAddButton(state, payload) {
      state.addButton.type = payload
      if (payload === 1) {
        state.addButton.name = "Add Request"
        state.addButton.type = 1
      }
      else if (payload === 2) {
        state.addButton.name = "Add Event"
        state.addButton.type = 2
      }
    },
    showAddRequestDialog(state, showDialog) {
      state.dialogs.addRequestDailog.showDialog = showDialog
    },
    showCloseRequestDialog(state, showDialog) {
      state.dialogs.closeRequestDialog.showDialog = showDialog
    },
    showAddEventDialog(state, showDialog) {
      state.dialogs.addEventDailog.showDialog = showDialog
    },
    showCloseEventDialog(state, showDialog) {
      state.dialogs.closeEventDialog.showDialog = showDialog
    },
    setAlertMessage(state, payload) {
      state.alert.showAlert = payload.showAlert || false
      state.alert.message = payload.message || ""
      state.alert.type = payload.type || "success"
      state.alert.dismissible = payload.dismissible || true
    },
  },
  getters: {
    getRequestDetails(_state, _getter, rootState) {
      return rootState.userDetails
    },
    getActiveRequest(state) {
      return state.requests.filter(request => request.active === true).reverse()
    },
    getPastRequest(state) {
      return state.requests.filter(request => request.active === false).reverse()
    },
    getActiveEvents(state) {
      return state.events.filter(event => event.active === true).reverse()
    },
    getPastEvent(state) {
      return state.events.filter(event => event.active === false).reverse()
    },
    getTimestamp() {
      return moment().unix() * 1000
    }
  },
  actions: {
    getRequests: firebaseAction(({ bindFirebaseRef }) => {
      const { uid } = auth().currentUser
      return bindFirebaseRef('requests', database()
        .ref("requests")
        .orderByChild("uid")
        .equalTo(uid))
    }),
    getEvents: firebaseAction(({ bindFirebaseRef }) => {
      const { uid } = auth().currentUser
      return bindFirebaseRef('events', database()
        .ref("events")
        .orderByChild("uid")
        .equalTo(uid))
    }),
    getDonorDetails: firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef('donationDetails', database()
        .ref("donationDetails"))
    }),
    async addRequest({ commit, getters }, payload) {
      try {
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        commit("buttonLoading", true, { root: true })
        const { hname, imageUrl, lat, lng, place, uid } = getters.getRequestDetails;
        const { recepientName, bloodType, gender, requestReason } = payload
        const requestRef = database().ref("requests")
        const key = requestRef.push().key
        await requestRef.child(key).set({
          hname,
          imageUrl,
          uid,
          lat,
          lng,
          requestReason,
          recepientName,
          gender,
          bloodType,
          place,
          accepted: 0,
          viewed: 0,
          active: true,
          key,
          timestamp: getters.getTimestamp
        })
        let geofire = new GeoFire(database().ref(`geofire/request/${bloodType}`))
        await geofire.set(key, [parseFloat(lng), parseFloat(lat)])
        commit("showAddRequestDialog", false)
      } catch (e) {
        commit("setAlertMessage", {
          showAlert: true,
          message: "There was an error adding the request, please try again",
          type: "error"
        })
        console.log(`There was an error setting geofire location ${e}`);
      } finally {
        commit("buttonLoading", false, { root: true })
      }
    },
    async closeRequest({ commit }, payload) {
      try {
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        commit("buttonLoading", true, { root: true })
        await database().ref(`requests/${payload}`).update({
          active: false
        })
      } catch (e) {
        commit("setAlertMessage", {
          showAlert: true,
          message: "There was an error closing the request, please try again",
          type: "error"
        })
        console.log(`Error updating => ${e}`);
      } finally {
        commit("buttonLoading", false, { root: true })
        commit("showCloseRequestDialog", false)
      }
    },
    async addEvent({ commit, getters, rootGetters }, payload) {
      try {
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        commit("buttonLoading", true, { root: true })
        const { hname, uid } = getters.getRequestDetails;
        const { eventName, startTime, endTime, date, eventDescription, image } = payload
        if (rootGetters.getLocationDetails.place === "") {
          throw "Please set the location of the hospital"
        } else if (image === null) {
          throw "Please add a photo of the event"
        }
        const momentDate = moment(date, "YYYY-MM-DD").format("Do MMM YYYY")
        const createdOn = moment().format("hh:mm a, Do MMM YYYY")
        const eventRef = database().ref("events")
        const key = eventRef.push().key
        const imageExtension = image.name.slice(image.name.lastIndexOf("."))
        const snapshot = await storage().ref(`Hospital/${uid}/events/${key}.${imageExtension}`).put(image)
        const imageUrl = await snapshot.ref.getDownloadURL()
        await eventRef.child(key).set({
          hname,
          eventName,
          startTime,
          endTime,
          date: momentDate,
          eventDescription,
          uid,
          imageUrl,
          createdOn,
          viewed: 0,
          active: true,
          key,
          timestamp: getters.getTimestamp,
          ...rootGetters.getLocationDetails
        })
        const { lat, lng } = rootGetters.getLocationDetails
        let geofire = new GeoFire(database().ref(`geofire/events`))
        await geofire.set(key, [parseFloat(lng), parseFloat(lat)])
        commit("showAddEventDialog", false)
      } catch (e) {
        commit("setAlertMessage", {
          showAlert: true,
          message: e.message || e || "There was an error adding the event, please try again",
          type: "error"
        })
      } finally {
        commit("buttonLoading", false, { root: true })
      }
    },
    async closeEvent({ commit }, payload) {
      try {
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        commit("buttonLoading", true, { root: true })
        await database().ref(`events/${payload}`).update({
          active: false
        })
      } catch (e) {
        commit("setAlertMessage", {
          showAlert: true,
          message: "There was an error closing the event, please try again",
          type: "error"
        })
        console.log(`Error updating => ${e}`);
      } finally {
        commit("buttonLoading", false, { root: true })
        commit("showCloseEventDialog", false)
      }
    }
  }
}