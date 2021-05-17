<template>
  <v-app v-if="data !== undefined">
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
          {{ getCompetences().length }} competences evaluées
        </v-chip>
        <v-chip class="ma-2" color="primary">
          {{ getEvaluations().length }} evaluations
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
            <td v-for="domaine in getDomaines()" :key="domaine.id">
              <v-chip
                class="ma-2"
                style="font-weight: 500"
                :color="
                  getNote(getEleveNote(item.eleve.id, domaine).note).color
                "
              >
                {{ getNote(getEleveNote(item.eleve.id, domaine).note).name }}
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
        this.getDomaines().forEach((domaine) => {
          headers.push({
            text: domaine.name,
            value: "note_" + this.getDomaines().indexOf(domaine),
          });
        });
      }
      return headers;
    },
    getEvaluations() {
      let evaluations = this.classe.evaluations.filter(
        (x) => x.annee === this.annee
      );
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
      let domainesIDs = [];
      this.getCompetences().forEach((competence) => {
        domainesIDs.push({
          cycleID: competence.cycleID,
          domaineID: competence.domaineID,
        });
      });
      let domaines = [];
      domainesIDs.forEach((domaineObj) => {
        let domaineName = this.data.cycles
          .find((cycle) => cycle.id == domaineObj.cycleID)
          .domaines.find((x) => x.id == domaineObj.domaineID).name;

        if (!domaines.some((x) => x.name === domaineName)) {
          domaines.push({
            domaineObj: domaineObj,
            name: domaineName,
          });
        }
      });
      return domaines;
    },
    getNotes() {
      let allNotes = [];

      this.getEvaluations()
        .map((x) => x.notes)
        .forEach((noteList) => {
          noteList.forEach((note) => allNotes.push(note));
        });

      return allNotes;
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
    getEleveNote(eleveID, domaine) {
      if (eleveID === undefined || domaine === undefined)
        return {
          eleveID: eleveID,
          domaineObj: domaine.domaineObj,
          note: 0,
        };

      let notes = this.getNotes().filter(
        (x) =>
          x.compObj.cycleID == domaine.domaineObj.cycleID &&
          x.compObj.domaineID == domaine.domaineObj.domaineID &&
          x.eleveID == eleveID
      );

      let total = notes.map((x) => x.note).reduce((a, b) => a + b);
      let nbNotes = notes.map((x) => x.note).length;

      return {
        eleveID: eleveID,
        domaineObj: domaine.domaineObj,
        note: parseFloat(total) / parseFloat(nbNotes),
      };
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