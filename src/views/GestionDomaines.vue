<script lang="ts" src="./GestionDomaines.ts"></script>

<template>
  <v-app class="pa-5 pt-1">
    <v-container class="mt-1 mb-1">
      <h1
        class="text-center text-uppercase"
        style="letter-spacing: 1px; font-weight: 300"
      >
        Gestion des cycles
      </h1>
    </v-container>
    <v-container class="pt-0">
      <v-container
        fluid
        v-for="(cycle, index) in cycles"
        :key="index"
        secondary
        class="pa-3 mb-3"
      >
        <v-container
          class="ma-0 pa-0 d-flex align-center justify-space-between"
        >
          <h1 class="white--text text-uppercase">{{ cycle.name }}</h1>
          <v-btn
            class="ma-0"
            text
            icon
            color="red lighten-2"
            @click="() => deleteCycle(cycle)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-container>
        <v-container
          fluid
          v-for="(domaine, index) in cycle.domaines"
          :key="index"
          white
          class="pb-0 mt-3"
        >
          <v-container
            class="ma-0 pa-0 d-flex align-center justify-space-between"
          >
            <h2>
              {{ domaine.name }}
            </h2>
            <v-btn
              class="ma-0"
              text
              icon
              color="red lighten-2"
              @click="() => deleteDomaine(domaine)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-container>

          <v-container
            fluid
            v-for="(champ, index) in domaine.champs"
            :key="index"
            class="grey lighten-3 pb-0 mt-3"
          >
            <v-container
              class="ma-0 pa-0 d-flex align-center justify-space-between"
            >
              <h3>
                {{ champ.name }}
              </h3>
              <v-btn
                class="ma-0"
                text
                icon
                color="red lighten-2"
                @click="() => deleteChamp(champ)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-container>

            <ul>
              <li
                v-for="(competence, index) in champ.competences"
                :key="index"
                class="d-flex justify-space-between"
              >
                <p class="ma-0">
                  {{ competence.name }}
                </p>
                <v-btn
                  class="ma-0"
                  text
                  icon
                  color="red lighten-2"
                  @click="() => deleteCompetence(competence)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </li>
            </ul>
            <DialogItemData
              v-model="dialogNewCompetence"
              title="Ajouter une competence"
              :getNewData="() => getNewCompetence()"
              :onConfirm="
                (data) => registerNewCompetence(cycle, domaine, champ, data)
              "
              class="ma-2 pb-3 ml-0"
            />
          </v-container>
          <DialogItemData
            v-model="dialogNewChamp"
            title="Ajouter un champ"
            :getNewData="() => getNewChamp()"
            :onConfirm="(data) => registerNewChamp(cycle, domaine, data)"
            class="ma-2 pb-2 ml-0"
          />
        </v-container>

        <v-container white fluid class="mt-3">
          <DialogItemData
            v-model="dialogNewDomaine"
            title="Ajouter un domaine"
            :getNewData="() => getNewDomaine()"
            :onConfirm="(data) => registerNewDomaine(cycle, data)"
          />
        </v-container>
      </v-container>
      <DialogItemData
        v-model="dialogNewCycle"
        title="Ajouter un cycle"
        :getNewData="() => getNewCycle()"
        :onConfirm="(data) => registerNewCycle(data)"
      />
    </v-container>
  </v-app>
</template>
