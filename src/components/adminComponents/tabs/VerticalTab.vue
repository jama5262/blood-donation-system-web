<template>
  <v-tabs vertical dark background-color="primary">
    <v-tab>Hospitals</v-tab>
    <v-tab>Donors</v-tab>
    <v-tab-item>
      <Hospitals />
    </v-tab-item>
    <v-tab-item>
      <Donors />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import Hospitals from "../../../views/adminViews/hospitalViews/Hospitals"
import Donors from "../../../views/adminViews/donorViews/Donors"
export default {
  components: {
    Hospitals,
    Donors
  }
};
</script>

<style lang="scss" scoped>
.v-tabs {
  height: inherit;
}
</style>