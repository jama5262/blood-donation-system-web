<template>
  <v-container>
    <v-row v-for="n in 4" justify="center" align="center">
      <v-col class="date-container" md="1">
        <span class="date font-weight-bold">20</span>
        <br />
        <span class="day font-weight-bold">Mon</span>
        <br />
        <span class="month-year font-weight-bold">Aug 2019</span>
      </v-col>
      <v-col md="4">
        <v-card>
          <v-row style="padding: 0 20px">
            <v-col md="auto">
              <v-avatar color="primary" size="64">
                <span class="white--text">AB+</span>
              </v-avatar>
            </v-col>
            <v-col>
              <span class="name font-weight-bold">John Doe</span>
              <br />
              <span class="gender font-weight-bold">Male</span>
              <br />
              <span class="gender font-weight-bold">South B, Nairobi City, Kenya</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="exp-container">
              <v-expansion-panels style="border-radius: 10px">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <span style="text-align: left" class="primary--text">VIEW MORE</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <span class="primary--text date">0 </span><span>donors reached</span><br>
                    <span class="primary--text date">7 </span><span>donors accepted the request</span><br>
                    <span class="gender">Reason</span><br>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus beatae culpa odio aperiam, necessitatibus repellendus cupiditate aliquam sit, consectetur aliquid quaerat vel fugit reiciendis at temporibus, obcaecati et soluta esse!</span>
                    <div class="d-flex justify-end pt-5">
                      <v-btn color="primary" text>Close Request</v-btn>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.date-container {
  text-align: center;
}
span {
  width: 100%;
  text-align: center;
}
.v-card {
  border-radius: 10px
}
.date {
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
}
.day {
  font-size: 1.125rem !important;
  font-weight: 400;
  letter-spacing: 0.0073529412em !important;
}
.month-year {
  font-size: 0.625rem !important;
  letter-spacing: 0.1073529412em !important;
  text-transform: uppercase;
}
.name {
  font-size: 1.2rem !important;
  font-weight: 400;
  letter-spacing: 0.0073529412em !important;
}
.gender {
  font-size: 0.725rem !important;
}
.exp-container {
  padding-bottom: 0;
  padding-top: 0;
}
</style>