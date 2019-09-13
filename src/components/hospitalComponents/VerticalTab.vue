<template>
  <v-tabs vertical dark background-color="primary" style="height: inherit">
    <v-tab @click="changedTab(1)">Requests</v-tab>
    <v-tab @click="changedTab(1)">Donors</v-tab>
    <v-tab @click="changedTab(2)">Events</v-tab>
    <v-tab-item>
      <Requests />
    </v-tab-item>
    <v-tab-item>
      <Donors />
    </v-tab-item>
    <v-tab-item>
      <Events />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import Requests from "../../views/hospitalViews/homeViews/Requests";
import Events from "../../views/hospitalViews/homeViews/Events";
import Donors from "../../views/hospitalViews/homeViews/Donors";

export default {
  methods: {
    changedTab(value) {
      this.$store.commit("hospitalModule/changeAddButton", value);
    }
  },
  components: {
    Requests,
    Events,
    Donors
  }
};
</script>

<style lang="scss" scoped>
</style>