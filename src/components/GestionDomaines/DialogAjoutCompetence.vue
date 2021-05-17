<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="green lighten-1" dark v-bind="attrs" v-on="on">
        Ajouter une competence
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Ajouter une competence
      </v-card-title>

      <v-card-text class="pa-3">
        <v-text-field
          v-model="ajout.name"
          type="text"
          label="Nom de la competence"
          class="ml-5 mr-5"
        ></v-text-field>
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

<script>
export default {
  props: {
    champ: Object,
  },
  data() {
    return {
      dialog: false,
      ajout: { nom: "" },
    };
  },
  methods: {
    confirm() {
      this.champ.competences.push(this.ajout);
      this.dialog = false;
      this.ajout = { nom: "" };
    },

    cancel() {
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>