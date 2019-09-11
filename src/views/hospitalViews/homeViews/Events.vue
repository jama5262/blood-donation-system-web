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
    <v-col>
      <div id="mapid" style="border: 1px solid black; height: 500px">
        <!-- <l-map :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :icon="icon" :lat-lng="marker"></l-marker>
        </l-map>
        <v-btn @click="changeLoc">change</v-btn>-->
      </div>
      <v-btn @click="changeLoc">change</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { LMap, LTileLayer, LMarker, LCircle } from "vue2-leaflet";
import EventCard from "../../../components/hospitalComponents/EventCard";
export default {
  data() {
    return {
      mymap: null,
      zoom: 13,
      center: L.latLng(-1.31749223699299, 36.8395721912384),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(-1.31749223699299, 36.8395721912384),
      icon: L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
      })
    };
  },
  methods: {
    changeLoc() {
      this.mymap.setView([-1.31749223699299, 36.8395721912384], 13)
    }
  },
  mounted() {
    this.mymap = L.map("mapid")
    this.mymap.setView([51.505, -0.09], 13);
    L.tileLayer(
      "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: "your.mapbox.access.token"
      }
    ).addTo(this.mymap);
  },
  components: {
    EventCard,
    LMap,
    LTileLayer,
    LMarker
  }
};
</script>

<style lang="scss" scoped>
.col {
  padding: 0 12px;
}
#mapid {
  z-index: 0;
}
</style>