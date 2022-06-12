import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

import  './plugins/axios'
//import { VueMaskDirective } from 'v-mask'
//import VueMask from 'v-mask';

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);
//Vue.directive('mask', VueMaskDirective);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  Vuelidate,
  render: h => h(App)
}).$mount('#app')
