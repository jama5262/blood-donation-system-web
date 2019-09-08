<template>
  <v-dialog v-model="showDialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn color="red lighten-2" dark v-on="on">Click Me</v-btn>
    </template>

    <v-card>
      <v-card-title class="font-weight-bold" primary-title>Add Request</v-card-title>

      <v-form v-model="valid">
        <v-text-field
          outlined
          v-model="recepientName"
          :rules="rules.recepientName"
          label="Recepient's name"
          required
        ></v-text-field>
        <v-select v-model="bloodType" :items="bloodTypeList" label="Blood type" outlined></v-select>
        <v-select v-model="gender" :items="genderList" label="Gender" outlined></v-select>
        <v-textarea auto-grow rows="2" outlined label="Reason for request" v-model="requestReason"></v-textarea>
      </v-form>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" text>Add</v-btn>
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
      bloodType: "Choose blood type",
      gender: "Choose gender",
      bloodTypeList: [
        "Choose blood type",
        "O+",
        "O-",
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-"
      ],
      genderList: ["Choose gender", "Male", "Female"],
      rules: {
        recepient: [value => !!v || "Please enter recepient's name"]
      }
    };
  },
  methods: {
    addRequest() {
      
    },
    closeDialog() {
      this.$store.commit("hospitalModule/showAddRequestDialog", false);
    }
  },
  computed: {
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

<style lang="scss" scoped>
.v-form {
  padding: 10px 30px 0 30px;
}
</style>