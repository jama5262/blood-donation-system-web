<template>
  <v-dialog v-model="showDialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn color="red lighten-2" dark v-on="on">Click Me</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <span class="name font-weight-bold">Jama Mohamed</span>
            <br />
            <span class="gender font-weight-bold">Male</span>
            <br />
            <span class="gender font-weight-bold">jama@gamil.com</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="refrence">Phone Number</span>
            <br />
            <span class="font-weight-bold">0712345678</span>
            <br />
          </v-col>
          <v-col>
            <span class="refrence">National ID</span>
            <br />
            <span class="font-weight-bold">12345678</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="refrence">Blood Type</span>
            <br />
            <span class="bloodType font-weight-bold primary--text">A+</span>
            <br />
          </v-col>
          <v-col>
            <span class="refrence">No of Donations</span>
            <br />
            <span class="bloodType font-weight-bold primary--text">2</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="refrence">Last Donated</span>
            <br />
            <span class="font-weight-bold">25 Aug 2019</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="refrence">Last Hospital Donated</span>
            <br />
            <span class="font-weight-bold">25 Aug 2019</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="refrence">Last Location Donated</span>
            <br />
            <span class="font-weight-bold">25 Aug 2019</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div id="donorDetailsMap">MAP HERE</div>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  methods: {
    closeDialog() {
      this.$store.commit("hospitalModule/showDonorDetailDialog", false);
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.$store.state.hospitalModule.dialogs.donorDetailsDialog
          .showDialog;
      },
      set(value) {
        this.$store.commit("hospitalModule/showDonorDetailDialog", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.name {
  font-size: 1.2rem !important;
  font-weight: 400;
  letter-spacing: 0.0073529412em !important;
}
.gender {
  font-size: 0.725rem !important;
}
.refrence {
  font-size: 0.725rem !important;
}
.bloodType {
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
}
.col {
  padding: 7px 12px
}
.v-card {
  padding: 15px 30px
}
</style>