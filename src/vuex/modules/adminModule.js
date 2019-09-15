export default {
  namespaced: true,
  state: {
    alert: {
      message: "",
      type: "success",
      dismissible: true,
      showAlert: false
    },
    dialogs: {
      allHospitalsDialog: {
        showDialog: false
      }
    },
    eventMap: null,
    donorProfileMap: null,
    leafletTile: {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }
  },
}