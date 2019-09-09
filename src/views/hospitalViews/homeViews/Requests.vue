<template>
  <v-tabs grow>
    <v-tab>Active Requests</v-tab>
    <v-tab>Past Requests</v-tab>

    <v-tab-item>
      <RequestCard :data="activeRequests"/>
    </v-tab-item>
    <v-tab-item>
      <RequestCard />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import { auth, database } from "firebase";
import RequestCard from "../../../components/hospitalComponents/RequestCard";

export default {
  computed: {
    activeRequests() {
      return this.$store.getters["hospitalModule/getActiveRequest"]
    }
  },
  created() {
    setTimeout( () => {
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