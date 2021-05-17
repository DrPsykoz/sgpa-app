<script lang="ts" src="./DialogAjoutEleve.ts"></script>

<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        dark
        :class="buttonClass === undefined ? 'green lighten-1' : buttonClass"
      >
        Ajouter un eleve
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Ajouter un eleve
      </v-card-title>

      <v-card-text class="pa-3">
        <v-text-field
          v-model="eleve.first_name"
          type="text"
          label="Nom"
          class="ml-5 mr-5"
        />
        <v-text-field
          v-model="eleve.last_name"
          type="text"
          label="Prenom"
          class="ml-5 mr-5"
        />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="confirm()"> Ajouter </v-btn>
        <v-btn color="red" text @click="cancel()"> Annuler </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
