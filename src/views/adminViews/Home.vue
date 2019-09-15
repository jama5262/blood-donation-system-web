<template>
  <div class="home-container">
    <HospitalDialog />
    <Appbar />
    <VerticalTab />
  </div>
</template>

<script>
import Appbar from "../../components/adminComponents/appbar/Appbar"
import VerticalTab from "../../components/adminComponents/tabs/VerticalTab";
import HospitalDialog from "./hospitalViews/Hospital";

export default {
  components: {
    Appbar,
    VerticalTab,
    HospitalDialog
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
</style>