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
  created() {
    initializeApp({
      apiKey: "AIzaSyDYu49q4dCwqqiXtX-T6ebGVSq9PwH3M18",
      authDomain: "elite-span-131415.firebaseapp.com",
      databaseURL: "https://elite-span-131415.firebaseio.com",
      projectId: "elite-span-131415",
      storageBucket: "elite-span-131415.appspot.com",
      messagingSenderId: "1064937901507",
      appId: "1:1064937901507:web:56aeb80122c8bbd1"
    });

    auth().onAuthStateChanged(async (user) => {
      try {
        store.commit("buttonLoading", true)
        if (user) {
          const { email, emailVerified, uid } = user
          store.commit("setUserDetails", {
            email,
            emailVerified,
            uid
          })
          console.log("user exists");
          const snapshot = await database().ref(`users/${uid}`).once("value")
          store.commit("setUserDetails", {
            ...snapshot.val()
          })
          if (snapshot.val().role === 1) {
            await router.replace("/hospital")
          } else {
            await router.replace("/admin")
          }
        } else {
          console.log("user does not exist");
          await router.replace("/")
        }
      } catch (e) {
        console.log(e);
        store.commit("hospitalModule/setAlertMessage", {
          showAlert: true,
          message: e.message || e,
          type: "error"
        })
      } finally {
        store.commit("buttonLoading", false)
      }
    })
  },
  render: h => h(App),
}).$mount('#app')
