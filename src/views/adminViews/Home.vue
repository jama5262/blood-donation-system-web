<template>
  <div class="home-container">
    <HospitalDialog />
    <HospitalMapDialog />
    <Appbar />
    <VerticalTab />
  </div>
</template>

<script>
import Appbar from "../../components/adminComponents/appbar/Appbar"
import VerticalTab from "../../components/adminComponents/tabs/VerticalTab";
import HospitalDialog from "./hospitalViews/Hospital";
import HospitalMapDialog from "../../components/adminComponents/dialogs/HospitalsMapDialog";

export default {
  components: {
    Appbar,
    VerticalTab,
    HospitalDialog,
    HospitalMapDialog
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
</style>