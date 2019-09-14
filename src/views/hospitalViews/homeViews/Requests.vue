<template>
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
</template>

<script>
import RequestCard from "../../../components/hospitalComponents/cards/RequestCard";

export default {
  computed: {
    activeRequests() {
      return this.$store.getters["hospitalModule/getActivePastRequest"](true);
    },
    pastRequests() {
      return this.$store.getters["hospitalModule/getActivePastRequest"](false);
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("hospitalModule/getRequests");
    }, 2000);
  },
  components: {
    RequestCard
  }
};
</script>