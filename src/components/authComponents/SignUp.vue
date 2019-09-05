<template>
  <div class="main-container">
    <p class="display-3">Sign Up</p>
    <v-card max-width="344" class="mx-auto">
      <v-text-field label="Email"></v-text-field>
      <v-text-field label="Password"></v-text-field>
    </v-card>
    <div class="button-container d-flex justify-end">
      <v-btn rounded color="primary">Login</v-btn>
    </div>
    <div class="link-container d-flex justify-center">
      <a v:onclick="openSignPage">Don't have an account? Create one</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openSignPage() {
      alert("ok")
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  padding: 15px 25px;
  border-radius: 20px
}
.button-container {
  padding: 20px 0
}
  .main-container {
    width: 300px
  }
</style>