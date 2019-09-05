<template>
  <div class="main-container">
    <p class="display-3 font-weight-bold primary--text">Kenya Blood</p>
    <p class="display-3 font-weight-bold primary--text">Donation</p>
    <p class="display-3 font-weight-bold primary--text">System</p>
    <Alert/>
    <v-card max-width="344" class="mx-auto">
      <v-text-field v-model="email" type="email" label="Email"></v-text-field>
      <v-text-field v-model="password" type="password" label="Password"></v-text-field>
    </v-card>
    <div class="button-container d-flex justify-end">
      <v-btn @click="login" :loading="loading" rounded color="primary">Log in</v-btn>
    </div>
    <div class="link-container d-flex justify-center">
      <router-link to="/signup">Don't have an account? Create one</router-link>
    </div>
  </div>
</template>

<script>

import Alert from "../alertComponents/Alert"

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    loading() {
      return this.$store.state.buttonLoading;
    }
  },
  methods: {
    login: function() {
      this.$store.dispatch("firebaseLogin", {
        email: this.email,
        password: this.password
      });
    }
  }
  ,components: {
    Alert
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  margin-top: 30px;
  padding: 15px 25px;
  border-radius: 20px;
}
.button-container {
  padding: 20px 0;
}
.main-container {
  width: 362px;
}
</style>