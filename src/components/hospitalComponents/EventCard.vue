<template>
  <v-container>
    <v-row v-for="n in data" :key="n.key" justify="center" align="center">
      <v-col md="8" class="pb-0">
        <v-card @click="changeLocation(n)">
          <v-row>
            <v-col class="py-0">
              <v-img
                style="border-top-left-radius: 10px; border-top-right-radius: 10px"
                :src="n.imageUrl"
                aspect-ratio="1"
                class="grey lighten-2"
                height="150px"
              ></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="px-6 py-3">
              <span class="eventName font-weight-bold">{{ n.eventName }}</span>
              <br />
              <span class="location font-weight-bold">{{ n.place }}</span>
              <br />
              <span class="location font-weight-bold">{{ n.date }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="exp-container">
              <v-expansion-panels class="exp-container" style="border-radius: 10px">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <span style="text-align: left" class="primary--text">VIEW MORE</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col class="pt-0">
                        <span class="location">Created On</span>
                        <br />
                        <span class="font-weight-bold">{{ n.createdOn }}</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="pt-0">
                        <span class="location">Start Time</span>
                        <br />
                        <span class="font-weight-bold">{{ n.startTime }}</span>
                      </v-col>
                      <v-col class="pt-0">
                        <span class="location">End Time</span>
                        <br />
                        <span class="font-weight-bold">{{ n.endTime }}</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <span class="primary--text mr-2 viewed">{{ n.viewed }}</span>
                        <span>people viewed</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="pt-0">
                        <span class="location">Description</span>
                        <br />
                        <span class="font-weight-bold">{{ n.eventDescription }}</span>
                      </v-col>
                    </v-row>
                    <v-dialog v-model="showDialog" width="500">
                      <template v-slot:activator="{ on }">
                        <div class="d-flex justify-end pt-0">
                          <v-btn v-if="n.active" color="primary" text v-on="on">Close Request</v-btn>
                        </div>
                      </template>

                      <v-card>
                        <v-card-title class="font-weight-bold" primary-title>Close Event</v-card-title>
                        <v-card-text>Are you sure you want to close the event?</v-card-text>
                        <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>
                          <v-btn
                            :loading="buttonLoading"
                            @click="closeEvent(n.key)"
                            color="primary"
                            text
                          >Close Event</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    closeDialog() {
      this.$store.commit("hospitalModule/showCloseEventDialog", false);
    },
    closeEvent(key) {
      this.$store.dispatch("hospitalModule/closeEvent", key);
    },
    changeLocation(value) {
      const {lat, lng, eventName } = value
      this.$store.commit("hospitalModule/changeLocation", { lat, lng, eventName })
    }
  },
  computed: {
    buttonLoading() {
      return this.$store.state.buttonLoading;
    },
    showDialog: {
      get() {
        return this.$store.state.hospitalModule.dialogs.closeEventDialog
          .showDialog;
      },
      set(value) {
        this.$store.commit("hospitalModule/showCloseEventDialog", value);
      }
    }
  }
};
</script>

<style scoped>
.v-card {
  border-radius: 10px;
}
.container {
  padding-bottom: 0;
}
.eventName {
  font-size: 1.2rem !important;
  font-weight: 400;
  letter-spacing: 0.0073529412em !important;
}
.location {
  font-size: 0.725rem !important;
}
.viewed {
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
}
.exp-container {
  padding-bottom: 0;
  padding-top: 0;
}
</style>