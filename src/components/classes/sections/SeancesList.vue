<template>
  <v-container v-if="classe" class="secondary mt-5 white--text pb-1">
    <v-container class="d-flex pa-0 justify-space-between">
      <h2 class="mb-2 ml-1" style="font-weight: 700; letter-spacing: 1px">
        SEANCES
      </h2>
      <div class="d-flex">
        <DialogItemData
          title="Ajouter une seance"
          buttonText="Nouvelle seance"
          :getNewData="() => getNewSeance()"
          :onConfirm="(data) => createSeance(data)"
          :keysTranslate="keysTranslate"
          :enabledKeys="['date_debut', 'date_fin']"
        />
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
      :items="classe.seances"
      :items-per-page="15"
      class="elevation-1 rounded-0 mt-1 mb-2"
      v-if="isDiplayed"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>
            {{ new Date(item.date_debut).toLocaleString("fr-FR") }}
          </td>
          <td>
            {{ new Date(item.date_fin).toLocaleString("fr-FR") }}
          </td>
          <td class="d-flex align-center">
            <v-btn
              text
              class="green--text rounded-0"
              :to="`/${classe.id}/seances/${item.id}`"
            >
              Voir
            </v-btn>
            <DialogItemData
              title="Modifier une seance"
              buttonText="Modifier"
              :onConfirm="(data) => null"
              :keysTranslate="keysTranslate"
              :enabledKeys="['date_debut', 'date_fin']"
              :defaultData="item"
            />

            <button-delete @click="() => deleteSeance(item)" />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Vue, Prop } from "vue-property-decorator";
import { IClasse, ISeance } from "@/interfaces";
import {
  dispatchCreateSeance,
  dispatchRemoveSeance,
} from "@/store/main/actions";

import DialogItemData from "@/components/global/dialogs/DialogItemData.vue";

@Component({
  components: {
    DialogItemData,
  },
})
export default class SeancesList extends Vue {
  @Prop() public classe: IClasse;

  public isDiplayed = true;
  public sortBy = 'date_debut';
  public sortDesc = true;

  public headers = [
    { text: "Date de début", value: "date_debut" },
    { text: "Date de fin", value: "date_fin" },
    { text: "Actions", value: "actions" },
  ];

  public keysTranslate = {
    date_debut: "Date de début",
    date_fin: "Date de fin",
  };

  public getNewSeance() {
    return new ISeance();
  }

  public createSeance(seance: ISeance) {
    dispatchCreateSeance(this.$store, { classe: this.classe, seance });
  }

  public removeSeance(seance: ISeance) {
    dispatchRemoveSeance(this.$store, {
      classe: this.classe,
      seance: seance,
    });
  }
}
</script>