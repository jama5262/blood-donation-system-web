<template>
  <v-alert dismissible text v-model="alert.showAlert" :type="alert.type">{{ alert.message }}</v-alert>
</template>

<script>
  export default {
    computed: {
      alert() {
        return this.$store.state.alert
      }
    }
  }
</script>