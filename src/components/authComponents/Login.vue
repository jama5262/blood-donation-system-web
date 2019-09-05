<template>
  <div class="main-container">
    <p class="display-3 font-weight-bold primary--text">Kenya Blood</p>
    <p class="display-3 font-weight-bold primary--text">Donation</p>
    <p class="display-3 font-weight-bold primary--text">System</p>
    <v-card max-width="344" class="mx-auto">
      <v-text-field type="email" label="Email"></v-text-field>
      <v-text-field type="password" label="Password"></v-text-field>
    </v-card>
    <div class="button-container d-flex justify-end">
      <v-btn rounded color="primary">Log in</v-btn>
    </div>
    <div class="link-container d-flex justify-center">
      <router-link to="/signup">Don't have an account? Create one</router-link>
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
  margin-top: 30px;
  padding: 15px 25px;
  border-radius: 20px
}
.button-container {
  padding: 20px 0
}
</style>