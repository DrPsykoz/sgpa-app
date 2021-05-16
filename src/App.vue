<script src="./App.ts"></script>

<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <v-container class="d-flex">
        <v-container class="d-flex">
          <v-icon color="white" class="pr-3" large>local_library</v-icon>
          <h1 class="pa-0 ma-0">SGPA</h1>
        </v-container>
        <v-container class="d-flex pa-5 justify-end">
          <v-btn to="/classes" text class="rounded-0">
            <span class="mr-2">
              <v-icon>groups</v-icon>
              Gestion des Classes
            </span>
          </v-btn>
          <v-btn justify="end" to="/gestion_domaines" text class="rounded-0">
            <span class="mr-2">
              <v-icon>description</v-icon>
              Gestion des cycles
            </span>
          </v-btn>
          <v-btn class="green rounded-0" @click="saveData()">
            <span class="mr-2">Sauvegarder</span>
          </v-btn>
        </v-container>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-alert
        style="position: fixed; z-index: 999"
        class="mt-2 ml-2"
        type="success"
        v-if="saveAlert"
        elevation="10"
      >
        Sauvegarde effectuée
      </v-alert>
      {{ data }}
      <router-view v-if="data != undefined" :data="data" />
    </v-main>
  </v-app>
</template>
