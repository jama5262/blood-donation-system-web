import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './vuex'
import vuetify from './plugins/vuetify'
import { initializeApp, auth, database } from "firebase"
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  mounted() {
    const firebaseConfig = {
      apiKey: "AIzaSyDYu49q4dCwqqiXtX-T6ebGVSq9PwH3M18",
      authDomain: "elite-span-131415.firebaseapp.com",
      databaseURL: "https://elite-span-131415.firebaseio.com",
      projectId: "elite-span-131415",
      storageBucket: "elite-span-131415.appspot.com",
      messagingSenderId: "1064937901507",
      appId: "1:1064937901507:web:56aeb80122c8bbd1"
    }

    initializeApp(firebaseConfig);

    auth().onAuthStateChanged(async (user) => {
      try {
        store.commit("buttonLoading", true)
        if (user) {
          const { email, emailVerified, uid } = user
          console.log("user exists");
          const snapshot = await database().ref(`users/${uid}`).once("value")
          store.commit("setUserDetails", {
            email,
            emailVerified,
            uid,
            ...snapshot.val()
          })
          if (snapshot.val().role === 1) {
            await router.replace("/hospital")
          } else {
            await router.replace("/admin")
          }
        } else {
          console.log("user does not exist");
        }
      } catch (e) {
        console.log(e);
      } finally {
        store.commit("buttonLoading", false)
      }
    })
  }
}).$mount('#app')
