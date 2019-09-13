<template>
  <div style="height: 100%">
    <Appbar />
    <Alert />
    <VerticalTab />
    <QRCodeDialog />
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
import QRCodeDialog from "../../../components/hospitalComponents/QRCodeDialog";

export default {
  components: {
    Appbar,
    VerticalTab,
    AddRequestDialog,
    AddEventsDialog,
    Alert,
    QRCodeDialog
  }
};
</script>

<style lang="scss" scoped>
</style>