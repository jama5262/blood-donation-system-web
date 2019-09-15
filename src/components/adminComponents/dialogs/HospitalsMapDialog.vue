<template>
  <v-dialog v-model="showDialog" width="900">
    <v-card>
      <div id="allHospitalMap"></div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    showDialog: {
      get() {
        return this.$store.state.adminModule.dialogs.hospitalMapDialog
          .showDialog;
      },
      set(value) {
        this.$store.commit("adminModule/showHospitalMapDialog", value);
      }
    }
  },
  updated() {
    this.$store.commit("adminModule/initalizeAllHospitalMap")
  }
};
</script>

<style lang="scss" scoped>
#allHospitalMap {
  z-index: 0;
  height: 700px;
  border-radius: 10px;
}
</style>