<template>
  <v-dialog v-model="showDialogMap" width="700">
    <template v-slot:activator="{ on }">
      <v-btn style="margin-bottom: 10px" color="primary" rounded v-on="on">
        Choose Location
        <v-icon right dark>mdi-map-marker</v-icon>
      </v-btn>
      <v-alert dense text :type="locationAlertType">
        {{ chosenLocation.label }}
      </v-alert>
    </template>
    <v-card>
      <l-map :zoom="leafletMap.zoom" :center="leafletMap.center">
        <v-menu z-index="1000" nudge-bottom="130" offset-y>
          <template v-slot:activator="{ on }">
            <div style="padding: 0 10px" class="d-flex align-center">
              <v-text-field
                solo
                class="search-container"
                v-on="on"
                v-model="placesSearch"
                label="Search hospital"
              ></v-text-field>
            </div>
          </template>
          <v-list width="700">
            <v-list-item
              v-for="(item, index) in searchItems"
              :key="index"
              @click="getLocation(item)"
            >
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <l-tile-layer :url="leafletMap.url" :attribution="leafletMap.attribution"></l-tile-layer>
        <l-marker :lat-lng="leafletMap.marker"></l-marker>
        <l-circle :radius="500" :lat-lng="leafletMap.marker"></l-circle>
      </l-map>
    </v-card>
  </v-dialog>
</template>

<script>
import { LMap, LTileLayer, LMarker, LCircle } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

export default {
  data() {
    return {
      currentLatLng: null,
      searchItems: [],
      locationAlertType: "warning",
      chosenLocation: {
        label: "No location chosen",
        lat: null,
        lng: null
      }
    };
  },
  methods: {
    getLocation(location) {
      this.currentLatLng = new L.LatLng(location.y, location.x)
      this.chosenLocation = { ...location }
      this.locationAlertType = "success"
      setTimeout(() => {
        this.$store.commit("showDialogMap", false)
      }, 2000)
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(location => {
      this.currentLatLng = new L.LatLng(
        location.coords.latitude,
        location.coords.longitude
      );
    });
  },
  computed: {
    leafletMap() {
      return {
        zoom: 15,
        center: this.currentLatLng,
        url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: this.currentLatLng
      };
    },
    showDialogMap: {
      get() {
        return this.$store.state.showDialogMap;
      },
      set(value) {
        this.$store.commit("showDialogMap", value);
      }
    },
    placesSearch: {
      get() {
        return "";
      },
      set(value) {
        const provider = new OpenStreetMapProvider();
        const results = provider
          .search({ query: value })
          .then(data => {
            this.searchItems = data;
          })
          .catch(error => {
            console.log(error);
          });
        return value;
      }
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircle
  }
};
</script>

<style lang="scss" scoped>
.v-dialog {
  width: 800px;
}
.v-card {
  height: 500px;
}
.search-container {
  position: absolute;
  top: 80px;
  z-index: 1000;
}
</style>