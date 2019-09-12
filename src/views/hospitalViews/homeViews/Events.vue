<template>
  <v-row>
    <v-col>
      <v-tabs grow>
        <v-tab>Active Events</v-tab>
        <v-tab>Past Events</v-tab>
        <v-tab-item>
          <EventCard :data="activeEvents" />
        </v-tab-item>
        <v-tab-item>
          <EventCard :data="pastEvents" />
        </v-tab-item>
      </v-tabs>
    </v-col>
    <v-col>
      <div id="eventMap"></div>
    </v-col>
  </v-row>
</template>

<script>
import EventCard from "../../../components/hospitalComponents/EventCard";
export default {
  data() {
    return {};
  },
  computed: {
    activeEvents() {
      return this.$store.getters["hospitalModule/getActiveEvents"];
    },
    pastEvents() {
      return this.$store.getters["hospitalModule/getPastEvent"];
    }
  },
  created() {
    setTimeout(() => {
      this.$store.dispatch("hospitalModule/getEvents");
    }, 1000);
  },
  mounted() {
    this.$store.commit("hospitalModule/initalizeEventMap");
  },
  components: {
    EventCard
  }
};
</script>

<style lang="scss" scoped>
.col {
  padding: 0 12px;
}
#eventMap {
  z-index: 0;
  height: 500px;
  border-radius: 10px;
  margin: 10px;
}
</style>