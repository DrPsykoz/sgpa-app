<template>
  <v-container v-if="classe" class="secondary mt-5 white--text pb-1">
    <v-container class="d-flex pa-0 justify-space-between">
      <h2 class="mb-2 ml-1" style="font-weight: 700; letter-spacing: 1px">
        SEANCES
      </h2>
      <div class="d-flex">
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
      :items-per-page="-1"
      class="elevation-1 rounded-0 mt-1 mb-2"
      v-if="isDiplayed"
    >
      <template v-slot:item="{ item }">
        <tr>
          {{
            item
          }}
          <td>
            {{ item.date_debut.toLocaleString("fr-FR") }}
          </td>
          <td>
            {{ item.date_fin.toLocaleString("fr-FR") }}
          </td>
          <td>
            <DialogAjoutEvaluation
              :editEvaluation="item"
              :classe="classe"
              :cycles="cycles"
              :buttonText="'Modifier'"
              :buttonClass="'black--text ml-2 rounded-0'"
              :isTextButton="true"
            />
            <btn-remove-list
              :index="classe.sceances.indexOf(item)"
              :list="classe.sceances"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Vue, Prop } from "vue-property-decorator";
import { IClasse } from "@/interfaces";

@Component({
  components: {},
})
export default class SeancesList extends Vue {
  @Prop() public classe: IClasse;

  public isDiplayed = true;

  public headers = [
    { text: "Date de début", value: "date_debut" },
    { text: "Date de fin", value: "date_fin" },
    { text: "Actions", value: "actions" },
  ];
}
</script>