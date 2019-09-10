<template>
  <div style="height: 100%">
    <Appbar />
    <Alert />
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
import Alert from "../../../components/hospitalComponents/Alert";

export default {
  components: {
    Appbar,
    VerticalTab,
    AddRequestDialog,
    AddEventsDialog,
    Alert
  }
};
</script>

<style lang="scss" scoped>
</style>