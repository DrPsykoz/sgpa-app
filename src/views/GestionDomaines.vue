<template>
  <v-app class="pa-5 pt-1">
    <v-container class="mt-1 mb-1"
      ><h1
        class="text-center text-uppercase"
        style="letter-spacing: 1px; font-weight: 300"
      >
        Gestion des cycles
      </h1>
    </v-container>
    <v-container class="pt-0">
      <v-container
        fluid
        v-for="(cycle, index) in data.cycles"
        :key="index"
        secondary
        class="pa-3 mb-3"
      >
        <v-container
          class="ma-0 pa-0 d-flex align-center justify-space-between"
        >
          <h1 class="white--text text-uppercase">{{ cycle.name }}</h1>
          <btn-remove-list :index="index" :list="data.cycles" />
        </v-container>
        <v-container
          fluid
          v-for="(domaine, index) in cycle.domaines"
          :key="index"
          white
          class="pb-0 mt-3"
        >
          <v-container
            class="ma-0 pa-0 d-flex align-center justify-space-between"
          >
            <h2>
              {{ domaine.name }}
            </h2>
            <btn-remove-list :index="index" :list="cycle.domaines" />
          </v-container>

          <v-container
            fluid
            v-for="(champ, index) in domaine.champs"
            :key="index"
            class="grey lighten-3 pb-0 mt-3"
          >
            <v-container
              class="ma-0 pa-0 d-flex align-center justify-space-between"
            >
              <h2>
                {{ champ.name }}
              </h2>
              <btn-remove-list :index="index" :list="domaine.champs" />
            </v-container>

            <ul>
              <li v-for="(competence, index) in champ.competences" :key="index">
                <p class="ma-0 d-flex align-center justify-space-between">
                  {{ competence.name }}
                  <btn-remove-list :index="index" :list="champ.competences" />
                </p>
              </li>
            </ul>

            <DialogAjoutDonneeSimple
              title="Ajouter une competence"
              v-model="champ.competences"
              :dataModel="{ id: getNextID(champ.competences), name: '' }"
            />
          </v-container>
          <DialogAjoutDonneeSimple
            title="Ajouter un champ"
            v-model="domaine.champs"
            :dataModel="{
              id: getNextID(domaine.champs),
              name: '',
              competences: [],
            }"
          />
        </v-container>
        <v-container white fluid class="mt-3">
          <DialogAjoutDonneeSimple
            v-model="cycle.domaines"
            title="Ajouter un domaine"
            :dataModel="{
              id: getNextID(cycle.domaines),
              name: '',
              champs: [],
            }"
          />
        </v-container>
      </v-container>
      <DialogAjoutDonneeSimple
        v-model="data.cycles"
        title="Ajouter un cycle"
        :dataModel="{
          id: getNextID(data.cycles),
          name: '',
          domaines: [],
        }"
      />
    </v-container>
  </v-app>
</template>

<script>
import DialogAjoutDonneeSimple from "../components/GestionDomaines/DialogAjoutDonneeSimple";

export default {
  props: {
    data: Object,
  },
  components: {
    DialogAjoutDonneeSimple,
  },
};
</script>

<style>
</style>