<template>
    <v-tabs grow>
      <v-tab>Active Requests</v-tab>
      <v-tab>Past Requests</v-tab>

      <v-tab-item>
        <RequestCard />
      </v-tab-item>
      <v-tab-item></v-tab-item>
    </v-tabs>
</template>

<script>
import RequestCard from "../../../components/hospitalComponents/RequestCard"

export default {
  components: {
    RequestCard
  }
};
</script>

<style lang="scss" scoped>
</style>