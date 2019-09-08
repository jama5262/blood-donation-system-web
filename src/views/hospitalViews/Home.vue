<template>
  <div>
    <Appbar />
    <v-content style="height: 93vh">
        <VerticalTab />
    </v-content>
  </div>
</template>

<script>
import Appbar from "../../components/hospitalComponents/Appbar";
import VerticalTab from "../../components/hospitalComponents/VerticalTab";

export default {
  components: {
    Appbar,
    VerticalTab
  }
};
</script>

<style lang="scss" scoped>
</style>