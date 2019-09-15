<template>
  <div class="main-container">
    <span class="header-name font-weight-bold primary--text">Sign Up</span>
    <Alert />
    <v-card max-width="344" class="mx-auto my-4 py-5 px-6">
      <v-img
        v-if="signUpData.imageUrl"
        :src="signUpData.imageUrl"
        aspect-ratio="1"
        class="primary mb-4"
        max-width="500"
        max-height="100"
      ></v-img>
      <v-btn @click="pickFile" class="mb-3" color="primary" rounded>
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
      <v-form class="pt-3 pb-0">
        <v-text-field :rules="rules" outlined v-model="signUpData.hname" label="Hospital Name"></v-text-field>
        <v-text-field :rules="rules" outlined v-model="signUpData.email" type="email" label="Email"></v-text-field>
        <v-text-field :rules="rules" outlined v-model="signUpData.password" type="password" label="Password"></v-text-field>
        <v-text-field :rules="rules" outlined v-model="signUpData.phone" label="Phone"></v-text-field>
      </v-form>
    </v-card>
    <div class="d-flex justify-space-between py-2">
      <v-btn @click="goBack" rounded color="primary">Back</v-btn>
      <v-btn @click="signup" :loading="buttonLoading" rounded color="primary">Sign Up</v-btn>
    </div>
  </div>
</template>

<script>
import DialogMap from "../mainComponents/dialogs/DialogMap";
import Alert from "../mainComponents/alerts/Alert";

export default {
  data() {
    return {
      rules: [v => !!v || "This field is required"],
      signUpData: {
        imageUrl: "",
        image: null,
        email: "",
        password: "",
        hname: "",
        phone: ""
      }
    };
  },
  computed: {
    buttonLoading() {
      return this.$store.state.buttonLoading;
    }
  },
  methods: {
    pickFile() {
      this.$refs.uploadImage.click();
    },
    uploadImage(event) {
      const files = event.target.files;
      this.signUpData.image = files[0];
      let fileName = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.signUpData.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
    },
    signup() {
      this.$store.dispatch("firebaseSignUp", this.signUpData);
    },
    goBack() {
      window.history.back();
    }
  },
  components: {
    DialogMap,
    Alert
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 10px;
}
.main-container {
  width: 300px;
}
#mapid {
  height: 180px;
}
.v-image {
  border-radius: 10px;
}
.header-name {
  font-size: 3rem !important;
  line-height: 3.125rem;
  letter-spacing: normal !important;
}
</style>