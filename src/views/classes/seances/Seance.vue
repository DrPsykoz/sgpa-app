<script lang="ts" src="./Seance.ts"></script>

<template>
  <v-app class="pb-0 mb-0" v-if="seance">
    <v-container style="position: relative" class="mt-2 mb-1 pb-0 mb-3">
      <v-btn
        style="position: absolute; height: 65%"
        class="rounded-0"
        color="secondary"
        to="/classes"
      >
        <v-icon medium color="white" class="pr-2"> mdi-arrow-left </v-icon>
        Retour
      </v-btn>
      <h1
        class="text-center text-uppercase"
        style="letter-spacing: 1px; font-weight: 300"
      >
        Seance
      </h1>
      <v-chip style="position: absolute; right: 0; top: 0" small>
        {{ seance.id }}
      </v-chip>
    </v-container>
    <v-container secondary>
      <v-container class="d-flex pa-0 justify-space-between flex-column">
        <h2
          class="mb-2 ml-1 white--text"
          style="font-weight: 700; letter-spacing: 1px"
        >
          ABSENCES
        </h2>
        <v-container class="white mb-2 d-flex justify-center">
          <div class="mx-2 d-flex align-center justify-center">
            <v-icon color="green"> mdi-check </v-icon>
            <span>Present</span>
          </div>
          <div class="mx-2 d-flex align-center justify-center">
            <v-icon color="red">mdi-close</v-icon>
            <span class="font-">Absent</span>
          </div>
        </v-container>
      </v-container>
      <v-data-table
        v-if="classe && seance"
        :headers="headers"
        :items="eleves"
        :items-per-page="5"
        class="elevation-1 rounded-0"
        :set="(notations = {})"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ `${item.first_name} ${item.last_name}` }}</td>
            <td
              class="d-flex align-center"
              @click="toggleAbsence(item.id)"
              style="cursor: pointer"
            >
              <v-icon v-if="isAbsent(item.id)" color="green">
                mdi-check
              </v-icon>
              <v-icon v-else color="red">mdi-close</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>

    <v-container secondary class="mt-2">
      <v-container class="d-flex pa-0 justify-space-between">
        <h2
          class="mb-2 ml-1 white--text"
          style="font-weight: 700; letter-spacing: 1px"
        >
          CAHIER DE TEXTE
        </h2>
      </v-container>
      <v-container class="white pa-0">
        <wysiwyg v-model="seance.cahier_texte" />
      </v-container>
    </v-container>
  </v-app>
</template>
