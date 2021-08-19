import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "@/store";
import vuetify from "./plugins/vuetify";

import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;

import GenericDialog from '@/components/General/GenericDialog.vue';

Vue.component('generic-dialog', GenericDialog);

import ButtonDelete from '@/components/global/buttons/ButtonDelete.vue';
Vue.component('button-delete', ButtonDelete);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
