<template>
  <v-btn class="ma-0" text icon color="red lighten-2">
    <v-icon>delete</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    index: Number,
    list: Array,
  },
  mounted() {
    if (this.list === undefined) {
      this.list = [];
    }
  },
};
</script>

<style>
</style>