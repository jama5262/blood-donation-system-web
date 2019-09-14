<template>
  <div class="main-container">
    <div class="d-flex flex-column">
      <span class="header-name font-weight-bold primary--text py-1">Kenya Blood</span>
      <span class="header-name font-weight-bold primary--text py-1">Donation</span>
      <span class="header-name font-weight-bold primary--text py-1">System</span>
    </div>
    <Alert />
    <v-card max-width="344" class="mx-auto my-4 py-5 px-6">
      <v-form class="pt-5 pb-0">
        <v-text-field :rules="rules" outlined v-model="email" type="email" label="Email"></v-text-field>
        <v-text-field :rules="rules" outlined v-model="password" type="password" label="Password"></v-text-field>
      </v-form>
    </v-card>
    <div class="py-2 pr-4 d-flex justify-end">
      <v-btn @click="login" :loading="buttonLoading" rounded color="primary">Log in</v-btn>
    </div>
    <div class="d-flex justify-center mt-4">
      <router-link to="/signup">
        <div class="d-flex flex-column">
          <span>Don't have an account?</span>
          <div class="d-flex justify-center">
            <span>Create one</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Alert from "../mainComponents/alerts/Alert";

export default {
  data() {
    return {
      email: "",
      password: "",
      rules: [v => !!v || "This field is required"]
    };
  },
  computed: {
    buttonLoading() {
      return this.$store.state.buttonLoading;
    }
  },
  methods: {
    login() {
      this.$store.dispatch("firebaseLogin", {
        email: this.email,
        password: this.password
      });
    }
  },
  components: {
    Alert
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 10px;
}
.main-container {
  width: 362px;
}
.header-name {
  font-size: 3rem !important;
  line-height: 3.125rem;
  letter-spacing: normal !important;
}
</style>