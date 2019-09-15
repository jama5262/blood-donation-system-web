<template>
  <v-dialog v-model="showDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Admin</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col :cols="2">
            <v-avatar color="orange" size="100">
              <img :src="hospitalProfile.imageUrl" alt="avatar">
            </v-avatar>
          </v-col>
          <v-col>
            <div class="d-flex flex-column">
              <span class="hospitalName font-weight-bold mb-2">{{ hospitalProfile.hname }}</span>
              <span>{{ hospitalProfile.place }}</span>
              <span>{{ hospitalProfile.email }}</span>
              <span>{{ hospitalProfile.phone }}</span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6" offset-md="3">
            <div id="hospitalMap"></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-tabs grow>
              <v-tab>Requests</v-tab>
              <v-tab>Events Requests</v-tab>
              <v-tab-item>
                <RequestCard :data="requests" />
              </v-tab-item>
              <v-tab-item>
                <EventsCard :data="events" />
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import RequestCard from "../../../components/adminComponents/cards/RequestCard";
import EventsCard from "../../../components/adminComponents/cards/EventCard";

export default {
  methods: {
    closeDialog() {
      this.$store.commit("adminModule/showHospitalDialog", false);
    }
  },
  computed: {
    hospitalProfile() {
      return this.$store.state.adminModule.dialogs.hospitalDialog.hospitalProfile
    },
    requests() {
      return this.$store.getters["adminModule/getRequests"];
    },
    events() {
      return this.$store.state.adminModule.hospitalEvents;
    },
    showDialog: {
      get() {
        return this.$store.state.adminModule.dialogs.hospitalDialog.showDialog;
      },
      set(value) {
        this.$store.commit("adminModule/showHospitalDialog", value);
      }
    }
  },
  components: {
    RequestCard,
    EventsCard
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
}
.hospitalName {
  font-size: 1.8rem !important;
  letter-spacing: 0.0073529412em !important;
}
#hospitalMap {
  z-index: 0;
  height: 200px;
  border-radius: 10px;
}
</style>