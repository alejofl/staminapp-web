import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import pinia from "./plugins/pinia";
import router from "./router";
import Vuelidate from 'vuelidate'


Vue.use(Vuelidate)

Vue.config.productionTip = false;



new Vue({
  vuetify,
  router,
  pinia,
  render: (h) => h(App)
}).$mount("#app");
