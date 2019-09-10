<template>
  <v-alert :dismissible="alert.dismissible" v-model="alert.showAlert" text :type="alert.type">{{ alert.message }}</v-alert>
</template>

<script>
export default {
  computed: {
    alert() {
      return this.$store.state.hospitalModule.alert;
    }
  }
};
</script>

<style lang="scss" scoped>
  .v-alert{ 
    margin: 0
  }
</style>