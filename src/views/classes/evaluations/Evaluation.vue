<script lang="ts" src="./Evaluation.ts"></script>

<template>
  <v-app class="pb-0 mb-0" v-if="evaluation">
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
        Evaluation
      </h1>
      <v-chip style="position: absolute; right: 0; top: 0" small>
        {{ evaluation_id }}
      </v-chip>
    </v-container>
    <v-container secondary class="white--text mb-5 pb-1">
      <v-container class="pa-0 d-flex justify-space-between">
        <h2 class="mb-2 ml-1" style="font-weight: 700; letter-spacing: 1px">
          LEGENDE
        </h2>
        <v-btn
          class="rounded-0 ml-3"
          color="white"
          @click="isLegendDisplayed = !isLegendDisplayed"
        >
          <v-icon medium color="secondary" v-if="isLegendDisplayed">
            mdi-eye
          </v-icon>
          <v-icon medium color="secondary" v-else> mdi-eye-off </v-icon>
        </v-btn>
      </v-container>
      <v-container
        white
        class="d-flex justify-space-around mb-2 mt-1"
        v-if="isLegendDisplayed"
      >
        <template v-for="i in 6" >
          <v-chip class="ma-2" style="font-weight: 500" :key="i" :set="noteDetail = $GlobalUtils.getNoteDetails(i - 1)" :color="noteDetail.color">
            {{ noteDetail.name }}
          </v-chip>
        </template>
      </v-container>
    </v-container>
    <v-container secondary>
      <v-container class="pt-0">
        <v-chip class="ma-2" color="primary">
          {{ evaluation.annee }}
        </v-chip>
        <v-chip class="ma-2" color="primary">
          {{ evaluation.trimestre }}
        </v-chip>
        <v-chip class="ma-2" color="primary">
          {{ evaluation.competences ? evaluation.competences.length : 0 }}
          competences evaluées
        </v-chip>
      </v-container>
      <v-data-table
        v-if="classe && evaluation"
        :headers="getHeaders()"
        :items="getRows()"
        :items-per-page="5"
        class="elevation-1 rounded-0"
        :set="(notations = {})"
      >
        <template v-slot:item="{ item }">
          <tr :set="(notations[`${item.eleve.id}`] = [])">
            <td>{{ `${item.eleve.first_name} ${item.eleve.last_name}` }}</td>
            <template v-for="(competence_id, id) in evaluation.competences">
              <td
                :key="id"
                :set="
                  (notations[`${item.eleve.id}`][id] =
                    $ElevesUtils.getOrCreateNotation(
                      evaluation,
                      item.eleve,
                      competence_id
                    ))
                "
              >
                <v-chip
                  class="ma-2"
                  style="font-weight: 500"
                  :color="
                    $GlobalUtils.getNoteDetails(
                      notations[item.eleve.id][id].note
                    ).color
                  "
                  @click="updateNote(notations[item.eleve.id][id])"
                >
                  {{
                    $GlobalUtils.getNoteDetails(
                      notations[item.eleve.id][id].note
                    ).name
                  }}
                </v-chip>
              </td>
            </template>
          </tr>
        </template>
      </v-data-table>
    </v-container>

    <v-container>
      <v-btn
        class="secondary"
        :to="`/${classe.id}/evaluations/${evaluation.id}/fiche_contrat`"
      >
        Fiche contrat
      </v-btn>
    </v-container>
  </v-app>
</template>
