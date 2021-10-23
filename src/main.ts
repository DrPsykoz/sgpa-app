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

import { GlobalUtilities } from "./utilities/GlobalUtilities";
Vue.prototype.$GlobalUtils = GlobalUtilities;

import { ElevesUtilities } from '@/utilities/ElevesUtilities';
Vue.prototype.$ElevesUtils = ElevesUtilities;

import DatetimePicker from 'vuetify-datetime-picker';
Vue.use(DatetimePicker);

import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {});

import "vue-wysiwyg/dist/vueWysiwyg.css";


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
