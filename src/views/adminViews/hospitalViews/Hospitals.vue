<template>
  <v-container>
    <DonorDetailDialog />
    <div class="d-flex flex-row mt-4">
      <div>
        <v-card>
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify "
              label="Search by hospital name and location"
              single-line
              outlined
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="allHospitals"
            :items-per-page="10"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="item in items" :key="item.email">
                  <td>{{ item.hname }}</td>
                  <td>{{ item.place }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <v-btn @click="viewProfile(item)" x-small text color="primary">View More</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import DonorDetailDialog from "../../../components/adminComponents/dialogs/DonorDetailsDialog";
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Name", align: "left", value: "hname" },
        { text: "Location", value: "place", align: "left" },
        { text: "Phone", value: "phone", align: "left" },
        { text: "Email", value: "email", align: "left" },
        { text: "Action" }
      ]
    };
  },
  methods: {
    viewProfile(value) {
      this.$store.dispatch("adminModule/getHospitalProfile", value);
    }
  },
  computed: {
    allHospitals() {
      return this.$store.state.adminModule.allHospitals;
    }
  },
  mounted() {
    this.$store.dispatch("adminModule/getAllHospitals");
  },
  components: {
    DonorDetailDialog
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
}
.v-card {
  border-radius: 10px;
}
</style>