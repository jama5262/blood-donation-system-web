<template>
  <div class="home-container">
    <Appbar />
    <VerticalTab />
  </div>
</template>

<script>
import Appbar from "../../components/adminComponents/appbar/Appbar"
import VerticalTab from "../../components/adminComponents/tabs/VerticalTab";
export default {
  components: {
    Appbar,
    VerticalTab,
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
</style>