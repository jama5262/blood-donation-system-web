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
              label="Search by name, national ID and bloodtype"
              single-line
              outlined
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="donorDetails"
            :items-per-page="10"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="item in items" :key="item.fullName">
                  <td>{{ item.fullName }}</td>
                  <td>{{ item.nationalId }}</td>
                  <td>{{ item.bloodType }}</td>
                  <td>{{ item.noOfDonations }}</td>
                  <td>{{ item.lastDonated }}</td>
                  <td>{{ item.hname }}</td>
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
        { text: "Name", align: "left", value: "fullName" },
        { text: "National ID", value: "nationalId", align: "left" },
        { text: "Blood Type", value: "bloodType", align: "left" },
        { text: "No. of Donations", value: "noOfDonations", align: "left" },
        { text: "Last Donated", value: "lastDonated", align: "left" },
        { text: "Hospital Donated To", value: "hname" },
        { text: "Action" }
      ]
    };
  },
  methods: {
    viewProfile(value) {
      this.$store.dispatch("adminModule/getDonorProfile", value);
    }
  },
  computed: {
    donorDetails() {
      return this.$store.state.adminModule.donationDetails;
    }
  },
  mounted() {
    this.$store.dispatch("adminModule/getDonorDetails");
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