<template>
  <v-alert dismissible text v-model="getAlertInfo.showAlert" :type="getAlertInfo.type">{{ getAlertInfo.message }}</v-alert>
</template>

<script>
  export default {
    computed: {
      getAlertInfo() {
        return this.$store.state.alert
      }
    }
  }
</script>