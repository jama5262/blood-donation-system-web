<template>
  <v-container>
    <div v-for="n in data" :key="n.key" class="d-flex flex-row justify-center align-center py-4">
      <div class="d-flex flex-column mr-9">
        <span class="date font-weight-bold text-center">{{ n.date.date }}</span>
        <span class="day font-weight-bold text-center">{{ n.date.day }}</span>
        <span class="month-year font-weight-bold text-center">{{ n.date.monthYear }}</span>
      </div>
      <div>
        <v-card>
          <div class="d-flex flex-row pa-4">
            <div class="pr-4">
              <v-avatar color="primary" size="64">
                <span class="white--text">{{ n.bloodType }}</span>
              </v-avatar>
            </div>
            <div class="d-flex flex-column">
              <span class="name font-weight-bold text-left">{{ n.recepientName }}</span>
              <span class="gender font-weight-bold text-left">{{ n.gender }}</span>
              <span class="place font-weight-bold text-left">{{ n.place }}</span>
            </div>
          </div>
          <div>
            <div>
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <span class="primary--text text-left">VIEW MORE</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="d-flex flex-column">
                      <div>
                        <span class="primary--text mr-2 viewed">{{ n.viewed }}</span>
                        <span>donors reached</span>
                      </div>
                      <div class="mb-3">
                        <span class="primary--text mr-2 accepted">{{ n.accepted }}</span>
                        <span>donors accepted the request</span>
                      </div>
                      <span class="reason text-left">Reason</span>
                      <span class="text-left">{{ n.requestReason }}</span>
                      <v-dialog v-model="showDialog" width="500">
                        <template v-slot:activator="{ on }">
                          <div class="d-flex justify-end pt-5">
                            <v-btn v-if="n.active" color="primary" text v-on="on">Close Request</v-btn>
                          </div>
                        </template>
                        <v-card>
                          <v-card-title class="font-weight-bold" primary-title>Close Request</v-card-title>
                          <v-card-text>Are you sure you want to close the request?</v-card-text>
                          <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>
                            <v-btn
                              :loading="buttonLoading"
                              @click="closeRequest(n.key)"
                              color="primary"
                              text
                            >Close Request</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </div>
        </v-card>
      </div>
    </div>
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

<style lang="scss" scoped>
.v-expansion-panels {
  border-radius: 10px;
}
.container {
  max-width: 600px;
}
.v-card {
  border-radius: 10px;
}
.date,
.viewed,
.accepted {
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
}
.day {
  font-size: 1.125rem !important;
  font-weight: 400;
  letter-spacing: 0.0073529412em !important;
}
.month-year {
  font-size: 0.625rem !important;
  letter-spacing: 0.1073529412em !important;
  text-transform: uppercase;
}
.name {
  font-size: 1.2rem !important;
  font-weight: 400;
  letter-spacing: 0.0073529412em !important;
}
.gender,
.place,
.reason {
  font-size: 0.725rem !important;
}
</style>