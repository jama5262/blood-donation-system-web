<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <qrcode-vue class="qrcode pa-10" :foreground="foreground" :value="value" :size="size" level="H"></qrcode-vue>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      size: 400,
      foreground: "#D32F2F"
    };
  },
  methods: {
    closeDialog() {
      this.$store.commit("hospitalModule/showqrCodeDialog", false);
    }
  },
  computed: {
    value() {
      return this.$store.state.userDetails.uid;
    },
    showDialog: {
      get() {
        return this.$store.state.hospitalModule.dialogs.qrCodeDialog.showDialog;
      },
      set(value) {
        this.$store.commit("hospitalModule/showqrCodeDialog", value);
      }
    }
  },
  components: {
    QrcodeVue
  }
};
</script>

<style lang="scss" scoped>
</style>