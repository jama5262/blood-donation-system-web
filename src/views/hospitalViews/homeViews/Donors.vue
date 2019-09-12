<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            click:row="clicked"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="item in items" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.noOfDonations }}</td>
                  <td>{{ item.lastDonated }}</td>
                  <td>{{ item.placeOfDonation }}</td>
                  <td>{{ item.hospitalDonatedTo }}</td>
                  <td>
                    <v-btn small text color="primary">View Profile</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "No. of Donations", value: "noOfDonations", align: "left" },
        { text: "Last Donated", value: "lastDonated", align: "left" },
        { text: "Place Of Donation", value: "placeOfDonation" },
        { text: "Hospital Donated To", value: "hospitalDonatedTo" },
        { text: "Action", value: "h" }
      ],
      desserts: [
        {
          name: "Jama Mohamed",
          noOfDonations: 1,
          lastDonated: "24 Aug 2019",
          placeOfDonation: "Nairobi, South B",
          hospitalDonatedTo: "South B Hospital"
        },
        {
          name: "John Doe",
          noOfDonations: 2,
          lastDonated: "16 Aug 2019",
          placeOfDonation: "Nairobi, South C",
          hospitalDonatedTo: "South C Hospital"
        }
      ]
    };
  },
  methods: {
    viewProfile(value) {}
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1500px;
}
.v-card {
  border-radius: 10px;
}
</style>