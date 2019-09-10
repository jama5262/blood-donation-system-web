import { auth, database } from "firebase";
import { GeoFire } from "geofire";
import moment from "moment";
import { firebaseAction } from 'vuexfire';

export default {
  namespaced: true,
  state: {
    requests: [],
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
    }
  },
  mutations: {
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
      return state.requests.filter(request => request.active === true)
    },
    getPastRequest(state) {
      return state.requests.filter(request => request.active === false)
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
      } catch (e) {
        commit("setAlertMessage", {
          showAlert: true,
          message: "There was an error adding the request, please try again",
          type: "error"
        })
        console.log(`There was an error setting geofire location ${e}`);
      } finally {
        commit("buttonLoading", false, { root: true })
        commit("showAddRequestDialog", false)
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
    async addEvent({ commit, getter }) {
      try {
        commit("setAlertMessage", {
          showAlert: false,
          message: "",
        })
        commit("buttonLoading", true, { root: true })
        const { hname, place, uid } = getters.getRequestDetails;
        const { eventName, startTime, endTime, date, eventDescription } = payload
        const eventRef = database().ref("events")
        const key = eventRef.push().key
        await eventRef.child(key).set({
          hname,
          eventName,
          startTime,
          endTime,
          date,
          eventDescription,
          uid,
          place,
          accepted: 0,
          viewed: 0,
          active: true,
          key,
          timestamp: getters.getTimestamp
        })
      } catch (e) {
        commit("setAlertMessage", {
          showAlert: true,
          message: "There was an error adding the event, please try again",
          type: "error"
        })
      } finally {
        commit("buttonLoading", false, { root: true })
        commit("showAddRequestDialog", false)
      }
    }
  }
}