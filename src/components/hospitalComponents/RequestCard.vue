<template>
  <v-container>
    <v-row justify="center">
      <v-col class="date-container" md="1">
        <span class="display-1 font-weight-bold">20</span><br>
        <span class="font-weight-bold">Mon</span><br>
        <span class="overline font-weight-bold">Aug 2019</span>
      </v-col>
      <v-col md="4">
        this is the card
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    justify: ["start", "center", "end", "space-around", "space-between"]
  })
};
</script>

<style lang="scss" scoped>
  .row, .col {
    border: 1px solid black
  }
  .date-container {
    text-align: center
  }
  span {
    width: 100%;
    text-align: center;
    font-family: "Montserrat", sans-serif;
  }
</style>