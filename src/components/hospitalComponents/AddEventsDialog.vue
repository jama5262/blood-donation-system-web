<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-card-title class="font-weight-bold" primary-title>Add Event</v-card-title>

      <v-form v-model="valid">
        <Alert />
        <v-img
          v-if="imageUrl"
          :src="imageUrl"
          aspect-ratio="1"
          class="grey lighten-2"
          height="150px"
          style="border-radius: 10px; margin-bottom: 15px"
        ></v-img>
        <v-btn @click="pickFile" style="margin-bottom: 10px" color="primary" rounded>
          Upload Image
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
        <input
          style="display: none"
          type="file"
          accept="image/*"
          ref="uploadImage"
          @change="uploadImage"
        />
        <DialogMap />
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
            <v-text-field
              v-model="date"
              :rules="rules.date"
              outlined
              label="Event Date"
              readonly
              v-on="on"
            ></v-text-field>
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
                <v-text-field
                  v-model="startTime"
                  :rules="rules.time"
                  outlined
                  label="Start Time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-model="startTime" scrollable>
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
                <v-text-field
                  v-model="endTime"
                  :rules="rules.time"
                  outlined
                  label="End Time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-model="endTime" scrollable>
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
        <v-btn :loading="buttonLoading" @click="addEvent" color="primary" text>Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DialogMap from "../alertComponents/DialogMap";
import Alert from "../../components/hospitalComponents/Alert";
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
      imageUrl: "",
      image: null,
      rules: {
        eventName: [v => !!v || "Please enter event name"],
        date: [v => !!v || "Please choose a date"],
        time: [v => !!v || "Please choose a time"],
        eventDescription: [v => !!v || "Please enter description of the event"]
      }
    };
  },
  methods: {
    pickFile() {
      this.$refs.uploadImage.click();
    },
    uploadImage(event) {
      const files = event.target.files;
      this.image = files[0];
      let fileName = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
    },
    addEvent() {
      if (this.valid) {
        this.$store.dispatch("hospitalModule/addEvent", {
          date: this.date,
          startTime: this.startTime,
          endTime: this.endTime,
          eventDescription: this.eventDescription,
          eventName: this.eventName,
          image: this.image
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
  },
  components: {
    DialogMap,
    Alert
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 10px 30px 0 30px;
}
</style>