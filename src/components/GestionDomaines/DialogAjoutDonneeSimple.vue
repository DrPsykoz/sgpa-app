<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on" class="ma-2 ml-0">
        {{ title }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ title }}
      </v-card-title>

      <v-card-text class="pa-3">
        <v-text-field
          v-model="ajout.name"
          type="text"
          label="Nom"
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
    list: Array,
    title: String,
    value: Array,
    dataModel: Object,
  },
  beforeMount() {
    if (this.value === undefined) {
      this.$emit("input", []);
    }

    this.ajout =
      this.dataModel !== undefined
        ? this.dataModel
        : { id: this.getNextID(this.value), name: "" };
  },
  data() {
    return {
      dialog: false,
      ajout: {},
    };
  },

  methods: {
    confirm() {
      this.value.push(this.ajout);
      this.$emit("input", this.value);
      this.dialog = false;
      this.ajout = { id: this.getNextID(this.value), name: "" };
    },

    cancel() {
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>