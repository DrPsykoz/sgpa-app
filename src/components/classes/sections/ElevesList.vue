<template>
  <v-container v-if="classe" class="secondary mt-5 white--text pb-1">
    <v-container class="d-flex pa-0 justify-space-between">
      <h2 class="mb-2 ml-1" style="font-weight: 700; letter-spacing: 1px">
        ELEVES
      </h2>
      <div class="d-flex">
        <DialogItemData
          title="Ajouter un eleve"
          buttonText="Nouvel eleve"
          :getNewData="() => getNewEleve()"
          :onConfirm="(data) => createEleve(data)"
          :keysTranslate="keysTranslate"
        >
          <template slot="button">
            <v-btn text class="success">
              <v-icon>add</v-icon>
            </v-btn>
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
      :items="classe.eleves"
      :items-per-page="-1"
      class="elevation-1 rounded-0 mb-2 mt-1"
      v-if="isDiplayed"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>
            <v-chip
              style="font-weight: 500"
              class="ma-2"
              :color="getNote(getMoyenne(item)).color"
            >
              {{ getNote(getMoyenne(item)).name }}
            </v-chip>
          </td>
          <td class="d-flex align-center">
            <DialogItemData
              title="Modifier un eleve"
              buttonText="Modifier"
              :onConfirm="(data) => null"
              :keysTranslate="keysTranslate"
              :defaultData="item"
            />
            <button-delete @click="() => removeEleve(item)" />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IClasse, IEleve } from "@/interfaces";
import { Component, Vue, Prop } from "vue-property-decorator";
import { dispatchCreateEleve, dispatchRemoveEleve } from "@/store/main/actions";

import DialogItemData from "@/components/global/dialogs/DialogItemData.vue";

import ElevesUtilities from "@/utilities/ElevesUtilities";
import GlobalUtilities from "@/utilities/GlobalUtilities";

@Component({
  components: {
    DialogItemData,
  },
})
export default class ElevesList extends Vue {
  @Prop() public classe: IClasse;

  public isDiplayed = true;

  public headers = [
    { text: "Nom", value: "last_name" },
    { text: "Prenom", value: "first_name" },
    { text: "Moyenne", value: "moyenne" },
    { text: "Actions", value: "actions", sortable: false },
  ];

  public keysTranslate = {
    first_name: "Prenom",
    last_name: "Nom",
  };

  public getNewEleve() {
    return new IEleve();
  }

  public createEleve(eleve: IEleve) {
    console.log(eleve);
    dispatchCreateEleve(this.$store, { classe: this.classe, eleve });
  }

  public removeEleve(eleve: IEleve) {
    dispatchRemoveEleve(this.$store, {
      classe: this.classe,
      eleve_id: eleve.id,
    });
  }

  public getMoyenne(eleve: IEleve) {
    return ElevesUtilities.getMoyenne(this.classe, eleve);
  }

  public getNote(note: number) {
    return GlobalUtilities.getNote(note);
  }
}
</script>