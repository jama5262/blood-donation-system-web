<template>
  <div class="home-container">
    <Appbar />
  </div>
</template>

<script>
import Appbar from "../../components/adminComponents/appbar/Appbar"
export default {
  components: {
    Appbar
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
</style>