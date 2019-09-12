<template>
  <v-container>
    <DonorDetailDialog />
    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="donorDetails"
            :items-per-page="5"
            click:row="clicked"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="item in items" :key="item.name">
                  <td>{{ item.fullName }}</td>
                  <td>{{ item.nationalId }}</td>
                  <td>{{ item.noOfDonations }}</td>
                  <td>{{ item.lastDonated }}</td>
                  <td>{{ item.hname }}</td>
                  <td>
                    <v-btn @click="viewProfile(item)" small text color="primary">View More</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
          <div id="donorProfileMap"></div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DonorDetailDialog from "../../../components/hospitalComponents/DonorDetailsDialog"

export default {
  data() {
    return {
      headers: [
        { text: "Name", align: "left", sortable: false, value: "name" },
        { text: "National ID", value: "nationalID", align: "left" },
        { text: "No. of Donations", value: "noOfDonations", align: "left" },
        { text: "Last Donated", value: "lastDonated", align: "left" },
        { text: "Hospital Donated To", value: "hospitalDonatedTo" },
        { text: "Action" }
      ]
    };
  },
  methods: {
    viewProfile(value) {
      this.$store.dispatch("hospitalModule/getDonorProfile", value)
    }
  },
  computed: {
    donorDetails() {
      return this.$store.state.hospitalModule.donationDetails;
    }
  },
  mounted() {
    this.$store.dispatch("hospitalModule/getDonorDetails");
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