<template>
  <div class="home-container">
    <Appbar />
    <Alert />
    <VerticalTab />
    <QRCodeDialog />
    <AddRequestDialog />
    <AddEventsDialog />
  </div>
</template>

<script>
import Appbar from "../../../components/hospitalComponents/appbar/Appbar";
import VerticalTab from "../../../components/hospitalComponents/tabs/VerticalTab";
import AddRequestDialog from "../../../components/hospitalComponents/dialogs/AddRequestDialog";
import AddEventsDialog from "../../../components/hospitalComponents/dialogs/AddEventsDialog";
import Alert from "../../../components/hospitalComponents/alerts/Alert";
import QRCodeDialog from "../../../components/hospitalComponents/dialogs/QRCodeDialog";

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
.home-container {
  height: 100%;
}
</style>