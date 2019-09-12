<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <span class="name font-weight-bold">{{ donorProfile.fullName }}</span>
            <br />
            <span class="gender font-weight-bold">{{ donorProfile.gender }}</span>
            <br />
            <span class="gender font-weight-bold">{{ donorProfile.email }}</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="refrence">Phone Number</span>
            <br />
            <span class="font-weight-bold">{{ donorProfile.phone }}</span>
            <br />
          </v-col>
          <v-col>
            <span class="refrence">National ID</span>
            <br />
            <span class="font-weight-bold">{{ donorProfile.nationalId }}</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="refrence">Blood Type</span>
            <br />
            <span class="bloodType font-weight-bold primary--text">{{ donorProfile.bloodType }}</span>
            <br />
          </v-col>
          <v-col>
            <span class="refrence">No of Donations</span>
            <br />
            <span class="bloodType font-weight-bold primary--text">{{ donorProfile.noOfDonations }}</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="refrence">Last Donated</span>
            <br />
            <span class="font-weight-bold">{{ donorProfile.lastDonated }}</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="refrence">Last Hospital Donated</span>
            <br />
            <span class="font-weight-bold">{{ donorProfile.hname }}</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="refrence">Last Location Donated</span>
            <br />
            <span class="font-weight-bold">{{ donorProfile.placeOfDonation }}</span>
            <br />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div id="donorProfileMap"></div>
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
    donorProfile() {
      return this.$store.state.hospitalModule.dialogs.donorDetailsDialog
          .donorProfile;
    },
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
#donorProfileMap {
  height: 300px;
}
</style>