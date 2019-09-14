<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-card-title class="font-weight-bold" primary-title>Add Request</v-card-title>
      <v-form class="px-7 pt-4 pb-0" v-model="valid">
        <v-text-field
          outlined
          :rules="rules.recepient"
          v-model="recepientName"
          label="Recepient's name"
          required
        ></v-text-field>
        <v-select
          :rules="rules.bloodType"
          v-model="bloodType"
          :items="bloodTypeList"
          label="Blood type"
          required
          outlined
        ></v-select>
        <v-select
          :rules="rules.gender"
          v-model="gender"
          :items="genderList"
          label="Gender"
          required
          outlined
        ></v-select>
        <v-textarea
          :rules="rules.reason"
          auto-grow
          rows="2"
          outlined
          label="Reason for request"
          v-model="requestReason"
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
      recepientName: "",
      requestReason: "",
      bloodType: "",
      gender: "",
      bloodTypeList: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      genderList: ["Male", "Female"],
      rules: {
        recepient: [v => !!v || "Please enter recepient's name"],
        bloodType: [v => !!v || "Please choose a blood type"],
        gender: [v => !!v || "Please choose a gender"],
        reason: [v => !!v || "Please enter reason for request"]
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
      this.$store.commit("hospitalModule/showAddRequestDialog", false);
    }
  },
  computed: {
    buttonLoading() {
      return this.$store.state.buttonLoading;
    },
    showDialog: {
      get() {
        return this.$store.state.hospitalModule.dialogs.addRequestDailog
          .showDialog;
      },
      set(value) {
        this.$store.commit("hospitalModule/showAddRequestDialog", value);
      }
    }
  }
};
</script>