<template>
  <v-tabs vertical dark background-color="primary" style="height: inherit">
    <v-tab @click="changedTab(1)">Requests</v-tab>
    <v-tab @click="changedTab(1)">Donors</v-tab>
    <v-tab @click="changedTab(2)">Events</v-tab>
    <v-tab-item>
      <Requests />
    </v-tab-item>
    <v-tab-item>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta vero quibusdam maxime fuga impedit! Pariatur aliquid nemo quis voluptatum, consequuntur fugiat tempore nostrum. Delectus fugiat velit aspernatur autem in nobis.</v-tab-item>
    <v-tab-item>
      <Events />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import Requests from "../../views/hospitalViews/homeViews/Requests";
import Events from "../../views/hospitalViews/homeViews/Events";
export default {
  methods: {
    changedTab(value) {
      this.$store.commit("hospitalModule/changeAddButton", value);
    }
  },
  components: {
    Requests,
    Events
  }
};
</script>

<style lang="scss" scoped>
</style>