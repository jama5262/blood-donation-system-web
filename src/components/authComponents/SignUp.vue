<template>
  <div class="main-container">
    <p class="display-3 font-weight-bold primary--text">Sign Up</p>
    <v-card max-width="344" class="mx-auto">
      <v-btn color="primary" rounded>
        Upload Image
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
      <v-text-field label="Hospital Name"></v-text-field>
      <v-text-field type="email" label="Email"></v-text-field>
      <v-text-field type="password" label="Password"></v-text-field>
      <v-text-field label="Phone"></v-text-field>
      <v-btn color="primary" rounded>
        Choose Location
        <v-icon right dark>mdi-map-marker</v-icon>
      </v-btn>
    </v-card>
    <div class="button-container d-flex justify-space-between">
      <v-btn v-on:click="goBack" rounded color="primary">Back</v-btn>
      <v-btn rounded color="primary">Sign Up</v-btn>
    </div>
    <div class="link-container d-flex justify-center"></div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack: function () {
      window.history.back();
    }
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
</style>