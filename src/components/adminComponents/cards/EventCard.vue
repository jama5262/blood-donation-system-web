<template>
  <v-container class="pb-0" style="max-width: 600px">
    <v-row v-for="n in data" :key="n.key" justify="center" align="center">
      <v-col md="8" class="pb-0">
        <v-card>
          <v-row>
            <v-col class="py-0">
              <v-img :src="n.imageUrl" aspect-ratio="1" class="grey lighten-2" height="150px"></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="px-6 py-3">
              <span class="eventName font-weight-bold">{{ n.eventName }}</span>
              <br />
              <span class="location font-weight-bold">{{ n.place }}</span>
              <br />
              <span class="date font-weight-bold">{{ n.date }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <span class="primary--text">VIEW MORE</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col class="pt-0">
                        <span class="reference">Created On</span>
                        <br />
                        <span class="font-weight-bold">{{ n.createdOn }}</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="pt-0">
                        <span class="reference">Start Time</span>
                        <br />
                        <span class="font-weight-bold">{{ n.startTime }}</span>
                      </v-col>
                      <v-col class="pt-0">
                        <span class="reference">End Time</span>
                        <br />
                        <span class="font-weight-bold">{{ n.endTime }}</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <span class="primary--text mr-2 viewed">{{ n.viewed }}</span>
                        <span>people viewed</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="pt-0">
                        <span class="reference">Description</span>
                        <br />
                        <span class="font-weight-bold">{{ n.eventDescription }}</span>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style scoped>
.container {
  max-width: 200px;
}
.v-card {
  border-radius: 10px;
}
.v-image {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.v-expansion-panels {
  border-radius: 10px
}
.eventName {
  font-size: 1.2rem !important;
  font-weight: 400;
  letter-spacing: 0.0073529412em !important;
}
.location, .reference, .date {
  font-size: 0.725rem !important;
}
.viewed {
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
}
</style>