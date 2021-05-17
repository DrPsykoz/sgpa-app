import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Classes from '../views/Classes.vue'
import Evaluation from '../views/Evaluation.vue'
import GestionDomaines from '../views/GestionDomaines.vue';
import Bilan from "../views/Bilan.vue";
import BilanAnnuel from "../views/BilanAnnuel.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', component: Classes },
  { path: '/classes', component: Classes },
  { path: '/gestion_domaines', component: GestionDomaines },
  { path: '/evaluations/:classe/:id', component: Evaluation },
  { path: '/bilan/:classe/:trimestre/:annee', component: Bilan },
  { path: '/bilan_annuel/:classe/:annee', component: BilanAnnuel },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
