<template>
  <v-container v-if="classe" class="secondary mt-5 white--text pb-1">
    <v-container class="d-flex pa-0 justify-space-between">
      <h2 class="mb-2 ml-1" style="font-weight: 700; letter-spacing: 1px">
        EVALUATIONS
      </h2>
      <div class="d-flex">
        <DialogItemData
          title="Evaluation"
          :getNewData="() => getNewEvaluation()"
          :onConfirm="(data) => createEvaluation(classe, data)"
        >
          <template slot="button">
            <v-btn text class="success">
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <template v-slot:key-trimestre="{ item }">
            <v-select
              :items="trimestres"
              label="Choix du trimestre"
              v-model="item.trimestre"
            />
          </template>
          <template v-slot:key-annee="{ item }">
            <v-select
              :items="annees"
              label="Choix de l'année"
              v-model="item.annee"
            />
          </template>
          <template v-slot:key-competences="{ item }">
            <v-select
              :items="competences"
              label="Choix des competences"
              item-text="text"
              item-value="value"
              v-model="item.competences"
              multiple
            >
              <template v-slot:item="{ item }">
                <h4 :class="item.class">{{ item.text }}</h4>
              </template>
            </v-select>
          </template>
          <template slot="key-notes">
            <span></span>
          </template>
        </DialogItemData>
        <v-btn
          class="rounded-0 ml-3"
          color="white"
          @click="isDiplayed = !isDiplayed"
        >
          <v-icon medium color="secondary" v-if="isDiplayed"> mdi-eye </v-icon>
          <v-icon medium color="secondary" v-else> mdi-eye-off </v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="classe.evaluations"
      :items-per-page="-1"
      class="elevation-1 rounded-0 mt-1 mb-2"
      v-if="isDiplayed"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.annee }}</td>
          <td>{{ item.trimestre }}</td>
          <td>
            <ul>
              <li v-for="comp in item.competences" :key="comp.id">
                {{ comp.competence.name }}
              </li>
            </ul>
          </td>
          <td class="d-flex align-center">
            <v-btn
              text
              class="green--text ml-2 rounded-0"
              :to="`/evaluations/${classe.id}/${item.id}`"
            >
              Noter
            </v-btn>
            <DialogItemData
              title="Evaluation"
              buttonText="Modifier"
              :getNewData="() => getNewEvaluation()"
              :onConfirm="(data) => createEvaluation(classe, data)"
            >
              <template slot="key-trimestre">
                <v-select
                  :items="trimestres"
                  label="Choix du trimestre"
                  v-model="item.trimestre"
                />
              </template>
              <template slot="key-annee">
                <v-select
                  :items="annees"
                  label="Choix de l'année"
                  v-model="item.annee"
                />
              </template>
              <template slot="key-competences">
                <v-select
                  :items="competences"
                  label="Choix des competences"
                  item-text="text"
                  item-value="value"
                  v-model="item.competences"
                  multiple
                >
                  <template v-slot:item="{ item }">
                    <h4 :class="item.class">{{ item.text }}</h4>
                  </template>
                </v-select>
              </template>
              <template slot="key-notes">
                <span></span>
              </template>
            </DialogItemData>
            <button-delete @click="() => deleteEvaluation(item)" />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Vue, Prop } from "vue-property-decorator";
import { EAnnee, ETrimestre, IClasse, IEvaluation } from "@/interfaces";
import { dispatchRemoveEvaluation } from "@/store/main/actions";

import DialogItemData from "@/components/global/dialogs/DialogItemData.vue";

import ElevesUtilities from "@/utilities/ElevesUtilities";
import GlobalUtilities from "@/utilities/GlobalUtilities";
import { readCompetences, readCycles } from "@/store/main/getters";

@Component({
  components: {
    DialogItemData,
  },
})
export default class EvalutationsList extends Vue {
  @Prop() public classe: IClasse;

  public isDiplayed = true;

  public headers = [
    { text: "Année", value: "annee" },
    { text: "Trimestre", value: "trimestre" },
    { text: "Competences evaluées", value: "competences" },
    { text: "Actions", value: "actions", sortable: false },
  ];

  public trimestres = Object.values(ETrimestre);
  public annees = Object.values(EAnnee);

  get cycles() {
    return readCycles(this.$store);
  }

  get competences() {
    return readCompetences(this.$store);
  }

  public getNewEvaluation() {
    return new IEvaluation();
  }

  public deleteEvalutation(evaluation: IEvaluation) {
    dispatchRemoveEvaluation(this.$store, {
      classe: this.classe,
      evaluation_id: evaluation.id,
    });
  }
}
</script>