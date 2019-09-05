import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#D32F2F',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
