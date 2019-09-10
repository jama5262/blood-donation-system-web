<template>
  <v-row>
    <v-col>
      <v-tabs grow>
        <v-tab>Active Events</v-tab>
        <v-tab>Past Events</v-tab>

        <v-tab-item>
          <EventCard />
          <EventCard />
        </v-tab-item>
        <v-tab-item></v-tab-item>
      </v-tabs>
    </v-col>
    <v-col style="border: 1px solid black">MAP HERE</v-col>
  </v-row>
</template>

<script>
import EventCard from  "../../../components/hospitalComponents/EventCard"
export default {
  components: {
    EventCard
  }
};
</script>

<style lang="scss" scoped>
  .col {
    padding: 0 12px;
  }
</style>