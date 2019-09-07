<template>
  <div class="main-container">
    <p class="display-3 font-weight-bold primary--text">Sign Up</p>
    <v-card max-width="344" class="mx-auto">
      <v-btn @click="pickFile" style="margin-bottom: 10px" color="primary" rounded>
        Upload Image
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
      <input style="display: none" type="file" accept="image/*" ref="uploadImage" @change="uploadImage">
      <DialogMap/>
      <v-text-field label="Hospital Name"></v-text-field>
      <v-text-field type="email" label="Email"></v-text-field>
      <v-text-field type="password" label="Password"></v-text-field>
      <v-text-field label="Phone"></v-text-field>
    </v-card>
    <div class="button-container d-flex justify-space-between">
      <v-btn v-on:click="goBack" rounded color="primary">Back</v-btn>
      <v-btn rounded color="primary">Sign Up</v-btn>
    </div>
    <div class="link-container d-flex justify-center"></div>
  </div>
</template>

<script>
import DialogMap from "../alertComponents/DialogMap"

export default {
  data() {
    return {
      imageUrl: "null",
      image: null
    }
  },
  methods: {
    pickFile() {
      this.$refs.uploadImage.click()      
    },
    uploadImage(event) {
      const files = event.target.files
      let fileName = files[0].name
      if (fileName.lastIndexOf(".") <= 0) {
        alert("Please add a valid file")
      }
      const fileReader = new FileReader()
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
    },
    goBack: function() {
      window.history.back();
    }
  },
  components: {
    DialogMap
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  margin-top: 30px;
  padding: 20px 25px;
  border-radius: 20px;
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
</style>