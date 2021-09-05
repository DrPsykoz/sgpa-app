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
          <div class="d-flex">
            <DialogItemData
              title="Modifier un cycle"
              buttonText="Modifier"
              color="white"
              :onConfirm="(data) => null"
              :keysTranslate="keysTranslation"
              :defaultData="cycle"
              :enabledKeys="['name']"
            />
            <v-btn
              class="ma-0"
              text
              icon
              color="red lighten-2"
              @click="() => deleteCycle(cycle)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </div>
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
            <div class="d-flex">
              <DialogItemData
                title="Modifier un domaine"
                buttonText="Modifier"
                color="secondary"
                :onConfirm="(data) => null"
                :keysTranslate="keysTranslation"
                :defaultData="domaine"
                :enabledKeys="['name']"
              />
              <v-btn
                class="ma-0"
                text
                icon
                color="red lighten-2"
                @click="() => deleteDomaine(cycle, domaine)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </div>
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
              <div class="d-flex">
                <DialogItemData
                  title="Modifier un champ"
                  buttonText="Modifier"
                  color="secondary"
                  :onConfirm="(data) => null"
                  :keysTranslate="keysTranslation"
                  :defaultData="champ"
                  :enabledKeys="['name']"
                />
                <v-btn
                  class="ma-0"
                  text
                  icon
                  color="red lighten-2"
                  @click="() => deleteChamp(cycle, domaine, champ)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </div>
            </v-container>

            <ul>
              <li
                v-for="(competence, index) in champ.competences"
                :key="index"
                class="d-flex justify-space-between align-center"
              >
                {{ competence.name }}
                <div class="d-flex">
                  <DialogItemData
                    title="Modifier une competence"
                    buttonText="Modifier"
                    color="secondary"
                    :onConfirm="(data) => null"
                    :keysTranslate="keysTranslation"
                    :defaultData="competence"
                    :enabledKeys="['name']"
                  />
                  <v-btn
                    class="ma-0"
                    text
                    icon
                    color="red lighten-2"
                    @click="
                      () => deleteCompetence(cycle, domaine, champ, competence)
                    "
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </div>
              </li>
            </ul>
            <DialogItemData
              v-model="dialogNewCompetence"
              title="Ajouter une competence"
              buttonText="Ajouter une competence"
              :getNewData="() => getNewCompetence()"
              :onConfirm="
                (data) => registerNewCompetence(cycle, domaine, champ, data)
              "
              class="ma-2 pb-3 ml-0"
              :keysTranslate="keysTranslation"
              :enabledKeys="['name']"
            >
              <template slot="button">
                <v-btn color="success" text> Ajouter une competence </v-btn>
              </template>
            </DialogItemData>
          </v-container>
          <DialogItemData
            v-model="dialogNewChamp"
            title="Ajouter un champ"
            buttonText="Ajouter un champ"
            :getNewData="() => getNewChamp()"
            :onConfirm="(data) => registerNewChamp(cycle, domaine, data)"
            class="ma-2 pb-2 ml-0"
            :keysTranslate="keysTranslation"
            :enabledKeys="['name']"
          >
            <template slot="button">
              <v-btn color="success" text> Ajouter un champ </v-btn>
            </template>
          </DialogItemData>
        </v-container>

        <v-container white fluid class="mt-3">
          <DialogItemData
            v-model="dialogNewDomaine"
            title="Ajouter un domaine"
            buttonText="Ajouter un domaine"
            :getNewData="() => getNewDomaine()"
            :onConfirm="(data) => registerNewDomaine(cycle, data)"
            :keysTranslate="keysTranslation"
            :enabledKeys="['name']"
          >
            <template slot="button">
              <v-btn color="success" text> Ajouter un domaine </v-btn>
            </template>
          </DialogItemData>
        </v-container>
      </v-container>
      <DialogItemData
        v-model="dialogNewCycle"
        title="Ajouter un cycle"
        buttonText="Ajouter un cycle"
        :getNewData="() => getNewCycle()"
        :onConfirm="(data) => registerNewCycle(data)"
        :keysTranslate="keysTranslation"
        :enabledKeys="['name']"
      >
        <template slot="button">
          <v-btn color="success" text> Ajouter un cycle </v-btn>
        </template>
      </DialogItemData>
    </v-container>
  </v-app>
</template>
