<template>
  <v-dialog v-model="showDialogMap" width="700">
    <template v-slot:activator="{ on }">
      <v-btn class="mb-2" color="primary" rounded v-on="on">
        Choose Location
        <v-icon right dark>mdi-map-marker</v-icon>
      </v-btn>
      <v-alert dense text :type="chosenLocation.type">{{ chosenLocation.label }}</v-alert>
    </template>
    <v-card>
      <div id="authMap"></div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    showDialogMap: {
      get() {
        return this.$store.state.showDialogMap;
      },
      set(value) {
        this.$store.commit("showDialogMap", value);
      }
    },
    chosenLocation() {
      return this.$store.state.chosenLocation;
    }
  },
  updated() {
    this.$store.commit("initializeAuthMap");
  }
};
</script>

<style lang="scss" scoped>
.v-dialog {
  width: 800px;
}
#authMap {
  height: 500px;
}
.search-container {
  position: absolute;
  top: 80px;
  z-index: 1000;
}
</style>
