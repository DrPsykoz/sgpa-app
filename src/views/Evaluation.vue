<template>
  <v-app class="pb-0 mb-0">
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
        Evaluation #{{ this.$route.params.id }}
      </h1>
    </v-container>
    <v-container secondary class="white--text mb-5 pb-1">
      <v-container class="pa-0 d-flex justify-space-between">
        <h2 class="mb-2 ml-1" style="font-weight: 700; letter-spacing: 1px">
          LEGENDE
        </h2>
        <v-btn
          class="rounded-0 ml-3"
          color="white"
          @click="display.legende = !display.legende"
        >
          <v-icon medium color="secondary" v-if="display.legende">
            mdi-eye
          </v-icon>
          <v-icon medium color="secondary" v-else> mdi-eye-off </v-icon>
        </v-btn>
      </v-container>
      <v-container
        white
        class="d-flex justify-space-around mb-2 mt-1"
        v-if="display.legende"
      >
        <v-chip class="ma-2" style="font-weight: 500" :color="getNote(0).color">
          {{ getNote(0).name }}
        </v-chip>
        <v-chip class="ma-2" style="font-weight: 500" :color="getNote(1).color">
          {{ getNote(1).name }}
        </v-chip>
        <v-chip class="ma-2" style="font-weight: 500" :color="getNote(2).color">
          {{ getNote(2).name }}
        </v-chip>
        <v-chip class="ma-2" style="font-weight: 500" :color="getNote(3).color">
          {{ getNote(3).name }}
        </v-chip>
        <v-chip class="ma-2" style="font-weight: 500" :color="getNote(4).color">
          {{ getNote(4).name }}
        </v-chip>
        <v-chip class="ma-2" style="font-weight: 500" :color="getNote(5).color">
          {{ getNote(5).name }}
        </v-chip>
      </v-container>
    </v-container>
    <v-container secondary v-if="evaluation !== undefined">
      <v-container class="pt-0">
        <v-chip class="ma-2" color="primary">
          {{ evaluation.annee }}
        </v-chip>
        <v-chip class="ma-2" color="primary">
          {{ evaluation.trimestre }}
        </v-chip>
        <v-chip class="ma-2" color="primary">
          {{ evaluation.competences.length }} competences evaluées
        </v-chip>
      </v-container>
      <v-data-table
        v-if="loaded"
        :headers="getHeaders()"
        :items="getRows()"
        :items-per-page="5"
        class="elevation-1 rounded-0"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.eleve.name + " " + item.eleve.surname }}</td>
            <td v-for="compObj in evaluation.competences" :key="compObj.id">
              <v-chip
                class="ma-2"
                style="font-weight: 500"
                :color="
                  getNote(getEleveNote(item.eleve.id, compObj).note).color
                "
                @click="updateNote(getEleveNote(item.eleve.id, compObj))"
              >
                {{ getNote(getEleveNote(item.eleve.id, compObj).note).name }}
              </v-chip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      loaded: false,
      classe: undefined,
      evaluation: undefined,
      display: {
        legende: true,
      },
    };
  },
  methods: {
    getHeaders() {
      let headers = [];
      headers.push({ text: "Eleves", value: "eleve" });
      if (this.evaluation !== undefined) {
        this.evaluation.competences.forEach((competence) => {
          headers.push({
            text: competence.competence.name,
            value: "note_" + this.evaluation.competences.indexOf(competence),
          });
        });
      }
      return headers;
    },
    getRows() {
      let rows = [];

      this.classe.eleves.forEach((eleve) => {
        let row = {
          eleve: eleve,
        };
        if (this.evaluation !== undefined) {
          this.evaluation.competences.forEach((competence) => {
            row[competence] = 0;
          });
        }

        rows.push(row);
      });

      return rows;
    },
    getEleveNote(eleveID, compObj) {
      if (this.evaluation.notes === undefined) this.evaluation.notes = [];

      if (eleveID === undefined || compObj === undefined)
        return {
          eleveID: eleveID,
          compObj: compObj,
          note: 0,
        };

      let noteObj = undefined;

      this.evaluation.notes.forEach((x) => {
        if (
          x.eleveID == eleveID &&
          JSON.stringify(x.compObj) === JSON.stringify(compObj)
        ) {
          noteObj = x;
        }
      });

      if (noteObj === undefined) {
        this.evaluation.notes.push({
          eleveID: eleveID,
          compObj: compObj,
          note: 0,
        });
        noteObj = this.getEleveNote(eleveID, compObj);
      }

      return noteObj;
    },
    updateNote(noteObj) {
      noteObj.note++;
      if (noteObj.note > 5) noteObj.note = 0;
    },
  },
  mounted() {
    this.classe = this.data.classes[this.$route.params.classe];
    this.evaluation = this.classe.evaluations[this.$route.params.id];
    this.loaded = true;
  },
};
</script>

<style>
</style>