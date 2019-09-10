<template>
  <div style="height: 100%">
    <Appbar />
    <VerticalTab />
    <AddRequestDialog />
    <AddEventsDialog />
  </div>
</template>

<script>
import Appbar from "../../../components/hospitalComponents/Appbar";
import VerticalTab from "../../../components/hospitalComponents/VerticalTab";
import AddRequestDialog from "../../../components/hospitalComponents/AddRequestDialog";
import AddEventsDialog from "../../../components/hospitalComponents/AddEventsDialog";

export default {
  components: {
    Appbar,
    VerticalTab,
    AddRequestDialog,
    AddEventsDialog
  }
};
</script>

<style lang="scss" scoped>
</style>