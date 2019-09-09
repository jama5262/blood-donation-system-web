import { database, auth } from "firebase";
import { GeoFire } from "geofire";
import { firebaseAction } from 'vuexfire'

export default {
  namespaced: true,
  state: {
    requests: [],
    addButton: {
      type: 1,
      name: "Add Request"
    },
    dialogs: {
      addRequestDailog: {
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
    }
  },
  actions: {
    async addRequest({ commit, getters }, payload) {
      try {
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
          key
        })
        let geofire = new GeoFire(database().ref(`geofire/${bloodType}`))
        await geofire.set(key, [parseFloat(lng), parseFloat(lat)])
      } catch (e) {
        console.log(`There was an error setting geofire location ${e}`);
      } finally {
        commit("buttonLoading", false, { root: true })
        commit("showAddRequestDialog", false)
      }
    },
    getRequests: firebaseAction(({ bindFirebaseRef }) => {
      const { uid } = auth().currentUser
      return bindFirebaseRef('requests', database()
        .ref("requests")
        .orderByChild("uid")
        .equalTo(uid))
    })
  }
}