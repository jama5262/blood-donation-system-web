<template>
  <div style="height: 100%">
    <Appbar />
    <VerticalTab />
    <AddRequestDialog />
  </div>
</template>

<script>
import Appbar from "../../../components/hospitalComponents/Appbar";
import VerticalTab from "../../../components/hospitalComponents/VerticalTab";
import AddRequestDialog from "../../../components/hospitalComponents/AddRequestDialog";

export default {
  components: {
    Appbar,
    VerticalTab,
    AddRequestDialog
  }
};
</script>

<style lang="scss" scoped>
</style>