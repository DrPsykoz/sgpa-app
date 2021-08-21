import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Classes from '../views/classes/Classes.vue'
import Evaluation from '../views/classes/evaluations/Evaluation.vue'
import GestionDomaines from '../views/GestionDomaines.vue';
import Bilan from "../views/Bilan.vue";
import BilanAnnuel from "../views/BilanAnnuel.vue"
import FicheContrat from "../views/classes/evaluations/fiche_contrat/FicheContrat.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', component: Classes },
  { path: '/classes', component: Classes },
  { path: '/gestion_domaines', component: GestionDomaines },
  { path: '/:classe/evaluations/:evaluation', component: Evaluation },
  { path: '/:classe/evaluations/:evaluation/fiche_contrat', component: FicheContrat },
  { path: '/bilan/:classe/:trimestre/:annee', component: Bilan },
  { path: '/bilan_annuel/:classe/:annee', component: BilanAnnuel },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
