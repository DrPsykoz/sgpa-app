<template>
  <v-app>
    <v-container style="position: relative" class="mt-1 mb-1">
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
        Bilan {{ trimestre === "all" ? "Annuel" : trimestre }} de
        {{ annee }}
      </h1>
    </v-container>
    <v-container secondary>
      <v-container class="pt-0">
        <v-chip class="ma-2" color="primary">
          {{ annee }}
        </v-chip>
        <v-chip class="ma-2" color="primary">
          {{ trimestre === "all" ? "Année entiere" : trimestre }}
        </v-chip>
        <v-chip class="ma-2" color="primary">
          {{ getCompetences().length }} competences evaluées
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
            <td
              v-for="compObj in getEvaluation().competences"
              :key="compObj.id"
            >
              <v-chip
                class="ma-2"
                style="font-weight: 500"
                :color="
                  getNote(getEleveNote(item.eleve.id, compObj).note).color
                "
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
      trimestre: undefined,
      annee: undefined,
      display: {
        legende: true,
      },
    };
  },
  methods: {
    getHeaders() {
      let headers = [];
      headers.push({ text: "Eleves", value: "eleve" });
      if (this.getEvaluation() !== undefined) {
        this.getEvaluation().competences.forEach((competence) => {
          headers.push({
            text: competence.competence.name,
            value:
              "note_" + this.getEvaluation().competences.indexOf(competence),
          });
        });
      }
      return headers;
    },
    getEvaluations() {
      let evaluations = this.classe.evaluations.filter(
        (x) => x.annee === this.annee
      );

      if (this.trimestre !== "all") {
        evaluations = evaluations.filter((x) => x.trimestre === this.trimestre);
      }

      return evaluations;
    },
    getCompetences() {
      let competences = [];

      this.getEvaluations().forEach((evaluation) => {
        evaluation.competences.forEach((competence) => {
          if (!competences.some((x) => this.isSame(x, competence))) {
            competences.push(competence);
          }
        });
      });

      return competences;
    },
    getDomaines() {
      let domainesIDs = this.getCompetences.reduce((x) => {
        x.cycleID, x.domaineID;
      });
    },
    getNotes() {
      let notesList = [];
      this.getEvaluations().forEach((evaluation) => {
        evaluation.notes.forEach((noteObj) => {
          let alreadyList = notesList.filter(
            (x) =>
              this.isSame(x.compObj, noteObj.compObj) &&
              this.isSame(x.eleveID, noteObj.eleveID) &&
              x.note > 0
          );
          if (alreadyList === undefined || alreadyList.length == 0) {
            notesList.push(Object.assign({}, noteObj));
          } else {
            alreadyList[0].note = Math.round(
              (alreadyList[0].note + parseFloat(noteObj.note)) / 2
            );
          }
        });
      });
      return notesList;
    },
    getEvaluation() {
      return {
        id: -1,
        trimestre: this.trimestre,
        annee: this.annee,
        competences: this.getCompetences(),
        notes: this.getNotes(),
      };
    },
    getRows() {
      let rows = [];

      this.classe.eleves.forEach((eleve) => {
        let row = {
          eleve: eleve,
        };

        this.getCompetences().forEach((competence) => {
          row[competence] = 0;
        });

        rows.push(row);
      });

      return rows;
    },
    getEleveNote(eleveID, compObj) {
      if (eleveID === undefined || compObj === undefined)
        return {
          eleveID: eleveID,
          compObj: compObj,
          note: 0,
        };

      let noteObj = undefined;

      this.getNotes().forEach((x) => {
        if (x.eleveID == eleveID && this.isSame(x.compObj, compObj)) {
          noteObj = x;
        }
      });

      return noteObj;
    },
  },
  beforeMount() {
    this.classe = this.data.classes[this.$route.params.classe];
    this.trimestre = this.$route.params.trimestre;
    this.annee = this.$route.params.annee;
    this.loaded = true;
  },
};
</script>

<style>
</style>