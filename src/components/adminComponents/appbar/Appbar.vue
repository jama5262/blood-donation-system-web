<template>
  <v-app-bar color="primary" dark>
    <v-toolbar-title>{{ adminName }}</v-toolbar-title>
    <div class="flex-grow-1"></div>
    <v-btn @click="showAllHospitalMap" icon>
      <v-icon>mdi-map </v-icon>
    </v-btn>
    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="n in menuItems" :key="n.type" @click="menuMethod(n.type)">
          <v-list-item-title>{{ n.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          type: 1,
          name: "Sign Out"
        }
      ]
    };
  },
  methods: {
    showAllHospitalMap() {
      this.$store.commit("adminModule/showHospitalMapDialog", true);
    },
    menuMethod(value) {
      if (value === 1) {
        this.$store.dispatch("firebaseSignOut");
      }
    },
  },
  computed: {
    adminName() {
      return this.$store.state.userDetails.name;
    },
  }
};
</script>