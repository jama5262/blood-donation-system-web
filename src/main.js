import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './vuex'
import vuetify from './plugins/vuetify'
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created() {
    this.$store.dispatch("initializeFirebase")
  },
  render: h => h(App),
}).$mount('#app')
