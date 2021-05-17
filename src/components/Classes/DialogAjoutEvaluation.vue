<script lang="ts" src="./DialogAjoutEvaluation.ts"></script>

<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :class="buttonClass === undefined ? 'green lighten-1' : buttonClass"
        dark
        v-bind="attrs"
        v-on="on"
        :text="isTextButton"
      >
        {{ buttonText === undefined ? "Ajouter une evaluation" : buttonText }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Ajouter une evaluation
      </v-card-title>

      <v-card-text class="pa-3">
        <v-select
          :items="trimestres"
          label="Choix du trimestre"
          v-model="evaluation.trimestre"
          class="ml-5 mr-5"
        ></v-select>
        <v-select
          :items="annees"
          label="Choix de l'année"
          v-model="evaluation.annee"
          class="ml-5 mr-5"
        ></v-select>
        <v-select
          :items="competences"
          label="Choix des competences"
          item-text="text"
          item-value="value"
          v-model="evaluation.competences"
          class="ml-5 mr-5"
          multiple
        >
          <template v-slot:item="{ item }">
            <h4 :class="item.class">{{ item.text }}</h4>
          </template>
        </v-select>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="confirm()">
          {{ isEdit ? "Modifier" : "Ajouter" }}
        </v-btn>
        <v-btn color="red" text @click="cancel()"> Annuler </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
