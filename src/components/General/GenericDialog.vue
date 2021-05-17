<template>
  <v-dialog v-model="value" max-width="500" persistent scrollable>
    <v-card>
      <v-toolbar
        v-if="title !== undefined"
        class="secondary white--text mb-2 pl-5"
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text style="font-size: 13px; padding-top: 12px">
        <slot name="content"> </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="buttons">
          <v-btn
            v-if="cancellable"
            class="grey white--text"
            @click.prevent="onCancel"
          >
            {{ Annuler }}
          </v-btn>
          <v-btn
            :color="confirmColor || 'secondary'"
            @click.prevent="onConfirm"
          >
            {{ confirmText }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    cancellable: Boolean,
    confirmText: String,
    confirmColor: String,
    onConfirm: Function || Promise,
    onCancel: Function || Promise,
    value: Boolean,
    title: String,
  },
};
</script>

<style>
</style>