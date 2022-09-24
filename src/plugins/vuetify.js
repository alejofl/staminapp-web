import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  iconfont: 'md',
  theme: {
    themes: {
      light: {
        primary: '#FD9900',
        secondary: '#001833',
        accent: '#E1E6EC',
        error: '#EA1601',
        info: '#001833',
        success: '#64BC26',
        warning: '#FAD202',
      }
    }
  }
});
