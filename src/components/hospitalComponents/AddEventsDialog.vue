<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-card-title class="font-weight-bold" primary-title>Add Event</v-card-title>

      <v-form v-model="valid">
        <v-text-field
          outlined
          :rules="rules.eventName"
          v-model="eventName"
          label="Event Name"
          required
        ></v-text-field>
        <v-menu
          ref="dateMenu"
          v-model="dateMenu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="date" outlined label="Event Date" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="dateMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dateMenu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-row>
          <v-col>
            <v-menu
              ref="startTimeMenu"
              v-model="startTimeMenu"
              :close-on-content-click="false"
              :return-value.sync="startTime"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="startTime" outlined label="Start Time" readonly v-on="on"></v-text-field>
              </template>
              <v-time-picker v-model="startTime" no-title scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="startTimeMenu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.startTimeMenu.save(startTime)">OK</v-btn>
              </v-time-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-menu
              ref="endTimeMenu"
              v-model="endTimeMenu"
              :close-on-content-click="false"
              :return-value.sync="endTime"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="endTime" outlined label="End Time" readonly v-on="on"></v-text-field>
              </template>
              <v-time-picker v-model="endTime" no-title scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="endTimeMenu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.endTimeMenu.save(endTime)">OK</v-btn>
              </v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-textarea
          :rules="rules.eventDescription"
          auto-grow
          rows="2"
          outlined
          label="Event Description"
          v-model="eventDescription"
          required
        ></v-textarea>
      </v-form>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>
        <v-btn :loading="buttonLoading" @click="addRequest" color="primary" text>Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      dateMenu: false,
      startTimeMenu: false,
      endTimeMenu: false,
      eventName: "",
      date: "",
      startTime: "",
      endTime: "",
      eventDescription: "",
      rules: {
        eventName: [v => !!v || "Please enter event name"],
        bloodType: [v => !!v || "Please choose a blood type"],
        gender: [v => !!v || "Please choose a gender"],
        eventDescription: [v => !!v || "Please enter description of the event"]
      }
    };
  },
  methods: {
    addRequest() {
      if (this.valid) {
        this.$store.dispatch("hospitalModule/addRequest", {
          recepientName: this.recepientName,
          bloodType: this.bloodType,
          gender: this.gender,
          requestReason: this.requestReason
        });
      }
    },
    closeDialog() {
      this.$store.commit("hospitalModule/showAddEventDialog", false);
    }
  },
  computed: {
    buttonLoading() {
      return this.$store.state.buttonLoading;
    },
    showDialog: {
      get() {
        return this.$store.state.hospitalModule.dialogs.addEventDailog
          .showDialog;
      },
      set(value) {
        this.$store.commit("hospitalModule/showAddEventDialog", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 10px 30px 0 30px;
}
</style>