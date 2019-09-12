<template>
  <div class="main-container">
    <p class="display-2 font-weight-bold primary--text">Sign Up</p>
    <Alert />
    <v-card max-width="344" class="mx-auto">
      <v-img
        v-if="signUpData.imageUrl"
        :src="signUpData.imageUrl"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="500"
        max-height="100"
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
      <v-text-field v-model="signUpData.hname" label="Hospital Name"></v-text-field>
      <v-text-field v-model="signUpData.email" type="email" label="Email"></v-text-field>
      <v-text-field v-model="signUpData.password" type="password" label="Password"></v-text-field>
      <v-text-field v-model="signUpData.phone" label="Phone"></v-text-field>
    </v-card>
    <div class="button-container d-flex justify-space-between">
      <v-btn @click="goBack" rounded color="primary">Back</v-btn>
      <v-btn @click="signup" :loading="loading" rounded color="primary">Sign Up</v-btn>
    </div>
    <div class="link-container d-flex justify-center"></div>
  </div>
</template>

<script>
import DialogMap from "../mainComponents/DialogMap";
import Alert from "../alertComponents/Alert";

export default {
  data() {
    return {
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
    loading() {
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
      if (fileName.lastIndexOf(".") <= 0) {
        alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.signUpData.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
    },
    async signup() {
      try {
        await this.$store.dispatch("firebaseSignUp", this.signUpData);
        this.$router.replace('/hospital')
      } catch (error) {}
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
  margin-top: 30px;
  padding: 20px 25px;
  border-radius: 10px;
}
.button-container {
  padding: 20px 0;
}
.main-container {
  width: 300px;
}
#mapid {
  height: 180px;
}
.v-image {
  margin-bottom: 10px;
  border-radius: 10px;
}
</style>