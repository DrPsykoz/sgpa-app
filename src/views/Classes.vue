<script lang="ts" src="./Classes.ts"></script>

<template>
  <v-app class="pa-5 pt-1">
    <v-container class="mt-1 mb-1">
      <h1
        class="text-center text-uppercase"
        style="letter-spacing: 1px; font-weight: 300"
      >
        Gestion des classes
      </h1>
    </v-container>

    <!-- Choix de la classe -->
    <v-container secondary>
      <v-btn
        v-for="classe in classes"
        :key="classe.id"
        :class="
          current_classe === classe
            ? 'ma-1 mr-2 rounded-lg'
            : 'ma-1 mr-2 rounded-0'
        "
        @click="current_classe = classe"
      >
        {{ classe.name === "" ? "#" + classe.id : classe.name }}
      </v-btn>
      <v-btn class="ma-1 green white--text rounded-0" @click="addNewClasse()">
        Ajouter une nouvelle classe
      </v-btn>
    </v-container>

    <!-- Configuration -->
    <v-container
      secondary
      class="mt-5 white--text pb-1"
      v-if="current_classe !== null"
    >
      <v-container class="d-flex pa-0 justify-space-between">
        <h2 class="mb-2 ml-1" style="font-weight: 700; letter-spacing: 1px">
          CONFIGURATION
        </h2>
        <v-btn
          class="rounded-0"
          color="white"
          @click="display.configuration = !display.configuration"
        >
          <v-icon medium color="secondary" v-if="display.configuration">
            mdi-eye
          </v-icon>
          <v-icon medium color="secondary" v-else> mdi-eye-off </v-icon>
        </v-btn>
      </v-container>
      <v-container
        white
        wrap
        class="d-flex pa-3 mb-2 mt-1"
        style="flex-direction: column"
        v-if="current_classe !== undefined && display.configuration"
      >
        <v-text-field label="Nom de la classe" v-model="current_classe.name" />

        <v-container class="d-flex pa-0">
          <v-container
            style="flex-direction: column"
            class="d-flex pa-2 pl-0 pr-1"
          >
            <h3
              class="black--text text-uppercase text-center"
              style="letter-spacing: 1px; font-weight: 400"
            >
              Année de 4eme:
            </h3>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan/${classes.id}/1er trimestre/4eme`"
            >
              Bilan 1er trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan/${classes.id}/2eme trimestre/4eme`"
            >
              Bilan 2eme trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan/${classes.id}/3eme trimestre/4eme`"
            >
              Bilan 3eme trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="'/bilan_annuel/' + classes.indexOf(current_classe) + '/4eme'"
            >
              Bilan année
            </v-btn>
          </v-container>
          <v-container
            style="flex-direction: column"
            class="d-flex pa-2 pl-1 pr-0"
          >
            <h3
              class="black--text text-uppercase text-center"
              style="letter-spacing: 1px; font-weight: 400"
            >
              Année de 3eme:
            </h3>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan/${classes.id}/1er trimestre/3eme`"
            >
              Bilan 1er trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan/${classes.id}/2eme trimestre/3eme`"
            >
              Bilan 2eme trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan/${classes.id}/3eme trimestre/3eme`"
            >
              Bilan 3eme trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan_annuel/${classes.id}/3eme`"
            >
              Bilan année
            </v-btn>
          </v-container>
        </v-container>

        <v-btn
          @click="deleteClasse(current_classe)"
          class="red white--text rounded-0"
        >
          Supprimer la classe
        </v-btn>
      </v-container>
    </v-container>

    <!-- Eleves -->
    <v-container
      v-if="current_classe !== null"
      class="secondary mt-5 white--text pb-1"
    >
      <v-container class="d-flex pa-0 justify-space-between">
        <h2 class="mb-2 ml-1" style="font-weight: 700; letter-spacing: 1px">
          ELEVES
        </h2>
        <div>
          <DialogAjoutEleve
            :classe="current_classe"
            :buttonClass="'green rounded-0'"
          />
          <v-btn
            class="rounded-0 ml-3"
            color="white"
            @click="display.eleves = !display.eleves"
          >
            <v-icon medium color="secondary" v-if="display.eleves">
              mdi-eye
            </v-icon>
            <v-icon medium color="secondary" v-else> mdi-eye-off </v-icon>
          </v-btn>
        </div>
      </v-container>
      <v-data-table
        :headers="headers"
        :items="current_classe.eleves"
        :items-per-page="-1"
        class="elevation-1 rounded-0 mb-2 mt-1"
        v-if="display.eleves"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              {{ item.first_name }}
            </td>
            <td>{{ item.last_name }}sssdzqdqzd</td>
            <td>
              <v-chip
                style="font-weight: 500"
                class="ma-2"
                :color="getNote(getMoyenne(5)).color"
              >
                {{ getNote(getMoyenne(5)).name }}
              </v-chip>
            </td>
            <td>
              <v-btn
                text
                class="red--text ml-2 rounded-0"
                @click="removeEleve(item)"
              >
                Supprimer
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>

    <!-- Evaluations -->
    <v-container
      v-if="current_classe !== null"
      class="secondary mt-5 white--text pb-1"
    >
      <v-container class="d-flex pa-0 justify-space-between">
        <h2 class="mb-2 ml-1" style="font-weight: 700; letter-spacing: 1px">
          EVALUATIONS
        </h2>
        <div>
          <DialogAjoutEvaluation
            :classe="current_classe"
            :cycles="cycles"
            :buttonClass="'green rounded-0'"
          />
          <v-btn
            class="rounded-0 ml-3"
            color="white"
            @click="display.evaluations = !display.evaluations"
          >
            <v-icon medium color="secondary" v-if="display.evaluations">
              mdi-eye
            </v-icon>
            <v-icon medium color="secondary" v-else> mdi-eye-off </v-icon>
          </v-btn>
        </div>
      </v-container>
      <v-data-table
        :headers="headersEvalutations"
        :items="current_classe.evaluations"
        :items-per-page="-1"
        class="elevation-1 rounded-0 mt-1 mb-2"
        v-if="display.evaluations"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              {{ item.annee }}
            </td>
            <td>{{ item.trimestre }}</td>
            <td>
              <ul>
                <li v-for="comp in item.competences" :key="comp.id">
                  {{ comp.competence.name }}
                </li>
              </ul>
            </td>
            <td>
              <v-container class="d-flex pa-0">
                <v-btn
                  text
                  class="green--text ml-2 rounded-0"
                  :to="
                    '/evaluations/' +
                    classes.indexOf(current_classe) +
                    '/' +
                    current_classe.evaluations.indexOf(item)
                  "
                  >Noter</v-btn
                >
                <DialogAjoutEvaluation
                  :editEvaluation="item"
                  :classe="current_classe"
                  :cycles="cycles"
                  :buttonText="'Modifier'"
                  :buttonClass="'black--text ml-2 rounded-0'"
                  :isTextButton="true"
                />
                <btn-remove-list
                  :index="current_classe.evaluations.indexOf(item)"
                  :list="current_classe.evaluations"
                />
              </v-container>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>

    <!-- Seances -->
    <v-container
      v-if="current_classe !== null"
      class="secondary mt-5 white--text pb-1"
    >
      <v-container class="d-flex pa-0 justify-space-between">
        <h2 class="mb-2 ml-1" style="font-weight: 700; letter-spacing: 1px">
          SEANCES
        </h2>
        <div class="d-flex">
          <!-- <DialogAjout
            v-model="current_classe.seances"
            :dataModel="{
              id: getNextID(current_classe.seances),
              date_debut: new Date(),
              date_fin: new Date(),
            }"
            :classe="current_classe"
            :cycles="cycles"
            :buttonClass="'green rounded-0 white--text'"
            :title="'Nouvelle seance'"
          /> -->
          <v-btn
            class="rounded-0 ml-3"
            color="white"
            @click="display.seances = !display.seances"
          >
            <v-icon medium color="secondary" v-if="display.seances">
              mdi-eye
            </v-icon>
            <v-icon medium color="secondary" v-else> mdi-eye-off </v-icon>
          </v-btn>
        </div>
      </v-container>
      <v-data-table
        :headers="headersSceances"
        :items="current_classe.seances"
        :items-per-page="-1"
        class="elevation-1 rounded-0 mt-1 mb-2"
        v-if="display.seances"
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
                :classe="current_classe"
                :cycles="cycles"
                :buttonText="'Modifier'"
                :buttonClass="'black--text ml-2 rounded-0'"
                :isTextButton="true"
              />
              <btn-remove-list
                :index="current_classe.sceances.indexOf(item)"
                :list="current_classe.sceances"
              />
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>

    <generic-dialog
      :value="dialogConfirmDeleteClasse"
      title="Supprimer cette classe ?"
      confirmText="Confirmer"
      :onConfirm="() => confirmDeleteClasse()"
    >
      <template slot="content">
        <p v-if="classe_to_delete !== null">
          Etes vous sur de vouloir supprimer la classe
          <b>{{ classe_to_delete.name }}</b> ?
        </p>
      </template>
    </generic-dialog>

    <generic-dialog
      :value="dialogConfirmRemoveEleve"
      title="Supprimer cet eleve ?"
      confirmText="Confirmer"
      :onConfirm="() => confirmRemoveEleve()"
    >
      <template slot="content">
        <p v-if="eleve_to_remove !== null">
          Etes vous sur de vouloir supprimer l'eleve
          <b>{{
            `${eleve_to_remove.first_name} ${eleve_to_remove.last_name}`
          }}</b>
          de cette classe ?
        </p>
      </template>
    </generic-dialog>
  </v-app>
</template>
