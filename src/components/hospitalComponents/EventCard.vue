<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col md="8" class="pb-0">
        <v-card>
          <v-row>
            <v-col class="px-6 py-3">
              <span class="eventName font-weight-bold">Event Name</span>
              <br />
              <span class="location font-weight-bold">Location</span>
              <br />
              <span class="location font-weight-bold">Date</span>
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
                        <span
                          class="font-weight-bold"
                        >12:00 PM, 24 Aug 2019</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="pt-0">
                        <span class="location">Start Time</span>
                        <br />
                        <span class="font-weight-bold">10: 30 PM</span>
                      </v-col>
                      <v-col class="pt-0">
                        <span class="location">End Time</span>
                        <br />
                        <span class="font-weight-bold">9: 30 PM</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <span class="primary--text mr-2 viewed">10</span>
                        <span>people viewed</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="pt-0">
                        <span class="location">Description</span>
                        <br />
                        <span
                          class="font-weight-bold"
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum molestiae iste id quidem architecto enim dolorem. Facilis fuga dolores numquam, accusamus maiores, aliquid tenetur distinctio quaerat impedit architecto voluptatibus aut?</span>
                      </v-col>
                    </v-row>
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
      this.$store.commit("hospitalModule/showCloseRequestDialog", false);
    },
    closeRequest(key) {
      this.$store.dispatch("hospitalModule/closeRequest", key);
    }
  },
  computed: {
    buttonLoading() {
      return this.$store.state.buttonLoading;
    },
    showDialog: {
      get() {
        return this.$store.state.hospitalModule.dialogs.closeRequestDialog
          .showDialog;
      },
      set(value) {
        this.$store.commit("hospitalModule/showCloseRequestDialog", value);
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
  padding-bottom: 0
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