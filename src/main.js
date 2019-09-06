import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './vuex'
import vuetify from './plugins/vuetify'
import firebase from "firebase"
import 'leaflet/dist/leaflet.css';

const firebaseConfig = {
  apiKey: "AIzaSyDYu49q4dCwqqiXtX-T6ebGVSq9PwH3M18",
  authDomain: "elite-span-131415.firebaseapp.com",
  databaseURL: "https://elite-span-131415.firebaseio.com",
  projectId: "elite-span-131415",
  storageBucket: "elite-span-131415.appspot.com",
  messagingSenderId: "1064937901507",
  appId: "1:1064937901507:web:56aeb80122c8bbd1"
}

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
