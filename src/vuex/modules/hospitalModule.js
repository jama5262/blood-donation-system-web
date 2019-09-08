import { database } from "firebase";

export default {
  namespaced: true,
  state: {
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
    getRequestDetails(state, getter, rootState) {
      return rootState.userDetails
    }
  },
  actions: {
    async addRequest({ getters }, payload) {
      const { hname, imageUrl, lat, lng, place, uid } = getters.getRequestDetails;
      const { recepientName, bloodType, gender, requestReason } = payload
      const requestRef = await database().ref("requests").push({
        hname,
        imageUrl,
        uid,
        lat,
        lng,
        requestReason,
        recepientName,
        gender,
        bloodType,
        place
      })
      console.log(requestRef.key);
    }
  }
}