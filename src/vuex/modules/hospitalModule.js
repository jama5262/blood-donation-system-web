export default  {
  namespaced: true,
  state: {
    addButton: {
      type: 1,
      name: "Add Request"
    }
  },
  mutations: {
    changeAddButton(state, payload) {
      state.addButton.type = payload
      if (payload === 1) {
        state.addButton.name = "Add Request"
      }
      else if (payload === 2) {
        state.addButton.name = "Add Event"
      }
    }
  },
  getters: {},
  actions: {}
}