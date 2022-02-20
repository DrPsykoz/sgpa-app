<script lang="ts" src="./Classes.ts"></script>

<template>
  <v-app class="pa-5 pt-1">
    <v-container class="mt-1 mb-1">
      <h1
        class="text-center text-uppercase"
        style="letter-spacing: 1px; font-weight: 300"
      >
        Gestion des sessions 
      </h1>
    </v-container>

    <!-- Choix de la classe -->
    <v-container secondary>
      <v-btn
        v-for="classe in classes"
        :key="classe.id"
        :class="
          current_classe === classe
            ? 'ma-1 mr-2 rounded-lg primary'
            : 'ma-1 mr-2 rounded-0'
        "
        @click="selectClasse(classe)"
      >
        {{ classe.name === "" ? "#" + classe.id : classe.name }}
      </v-btn>
      <v-btn class="ma-1 green white--text rounded-0" @click="addNewClasse()">
        Ajouter une nouvelle session
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
        <v-text-field label="Nom de la session" v-model="current_classe.name" />

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
              disabled
            >
              Bilan 1er trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan/${classes.id}/2eme trimestre/4eme`"
              disabled
            >
              Bilan 2eme trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan/${classes.id}/3eme trimestre/4eme`"
              disabled
            >
              Bilan 3eme trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="'/bilan_annuel/' + classes.indexOf(current_classe) + '/4eme'"
              disabled
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
              disabled
            >
              Bilan 1er trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan/${classes.id}/2eme trimestre/3eme`"
              disabled
            >
              Bilan 2eme trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan/${classes.id}/3eme trimestre/3eme`"
              disabled
            >
              Bilan 3eme trimestre
            </v-btn>
            <v-btn
              class="primary rounded-0 mt-2"
              :to="`/bilan_annuel/${classes.id}/3eme`"
              disabled
            >
              Bilan année
            </v-btn>
          </v-container>
        </v-container>

        <v-btn
          @click="deleteClasse(current_classe)"
          class="red white--text rounded-0"
        >
          Supprimer la session
        </v-btn>
      </v-container>
    </v-container>

    <!-- Eleves -->
    <ElevesList :classe="current_classe" />

    <!-- Evaluations -->
    <EvaluationsList :classe="current_classe" />

    <!-- Seances -->
    <SeancesList :classe="current_classe" />

    <generic-dialog
      v-model="dialogConfirmDeleteClasse"
      title="Supprimer cette classe ?"
      confirmText="Confirmer"
      :onConfirm="() => confirmDeleteClasse()"
      cancellable
    >
      <template slot="content">
        <p v-if="classe_to_delete !== null">
          Etes vous sur de vouloir supprimer la classe
          <b>{{ classe_to_delete.name }}</b> ?
        </p>
      </template>
    </generic-dialog>
  </v-app>
</template>
