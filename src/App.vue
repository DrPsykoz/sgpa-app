<script src="./App.ts"></script>

<template>
  <v-app>
    <v-app-bar app color="secondary" dark class="no-print">
      <v-container class="d-flex">
        <v-container class="d-flex align-center">
          <v-icon color="white" class="pr-3" large>local_library</v-icon>
          <h1 class="pa-0 ma-0">SGPA</h1>
        </v-container>

        <v-container class="d-flex pa-5 justify-end">
          <v-btn to="/classes" text class="rounded-0">
            <span class="mr-2">
              <v-icon>groups</v-icon>
              Sessions
            </span>
          </v-btn>
          <v-btn justify="end" to="/gestion_domaines" text class="rounded-0">
            <span class="mr-2">
              <v-icon>description</v-icon>
              Cycles
            </span>
          </v-btn>
          <v-btn class="green rounded-0" @click="saveData()">
            <span class="mr-2">Sauvegarder</span>
          </v-btn>
        </v-container>
      </v-container>
    </v-app-bar>

    <v-main>
      <div style="position: fixed; z-index: 999" class="no-print">
        <v-tooltip
          right
          v-for="notification in notifications"
          :key="notification.id"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-alert
              style="cursor: pointer"
              class="ma-2 pa-2 d-flex pr-4"
              :type="`${notification.type}`"
              elevation="10"
              dense
              tooltip="Clique pour retirer cette notification"
              @click="() => removeNotification(notification)"
              v-bind="attrs"
              v-on="on"
            >
              <span>{{ notification.text }}</span>
            </v-alert>
          </template>
          <span>Fermer cette notification</span>
        </v-tooltip>
      </div>

      <router-view class="router-view" />
    </v-main>
  </v-app>
</template>

<style lang="scss">
* {
  font-family: "Roboto", sans-serif;
}

#app {
  max-width: 1200px;
  margin: auto;
}
</style>


