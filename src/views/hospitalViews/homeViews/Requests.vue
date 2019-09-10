<template>
  <div>
    <v-tabs grow>
      <v-tab>Active Requests</v-tab>
      <v-tab>Past Requests</v-tab>

      <v-tab-item>
        <RequestCard :data="activeRequests" />
      </v-tab-item>
      <v-tab-item>
        <RequestCard :data="pastRequests" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { auth, database } from "firebase";
import RequestCard from "../../../components/hospitalComponents/RequestCard";

export default {
  computed: {
    activeRequests() {
      return this.$store.getters["hospitalModule/getActiveRequest"];
    },
    pastRequests() {
      return this.$store.getters["hospitalModule/getPastRequest"];
    }
  },
  created() {
    setTimeout(() => {
      this.$store.dispatch("hospitalModule/getRequests");
    }, 1000);
  },
  components: {
    RequestCard
  }
};
</script>

<style lang="scss" scoped>
</style>