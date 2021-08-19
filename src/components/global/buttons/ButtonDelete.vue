<template>
  <v-btn class="ma-0" text icon color="red lighten-2" @click="click">
    <v-icon>delete</v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>