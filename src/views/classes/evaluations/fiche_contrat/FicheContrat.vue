<script lang="ts" src="./FicheContrat.ts"></script>

<template>
  <div v-if="classe && evaluation" class="fiche_contrat">
    <v-container
      style="position: relative"
      class="pb-0 mb-3 pt-0 d-flex flex-row justify-space-between align-center"
    >
      <v-btn
        class="rounded-0 no-print"
        color="secondary"
        :to="`/${classe.id}/evaluations/${evaluation.id}`"
      >
        <v-icon medium color="white" class="pr-2"> mdi-arrow-left </v-icon>
        Retour
      </v-btn>
      <h1
        class="text-center text-uppercase"
        style="letter-spacing: 1px; font-weight: 300; flex-grow: 1"
      >
        Fiche contrat
      </h1>
      <v-btn
        class="rounded-0 no-print"
        color="secondary"
        @click="() => print()"
      >
        <v-icon medium color="white" class="pr-2"> mdi-printer </v-icon>
        Imprimer
      </v-btn>
    </v-container>

    <v-container
      class="secondary--text pa-2 pb-0"
      style="border: solid black 2px; position: relative"
    >
      <div class="d-flex">
        <h4>Intitulé du projet:</h4>
        <input
          v-model="evaluation.fiche_contrat.intitule_projet"
          type="text"
          class="ml-2"
        />
      </div>
      <div class="d-flex">
        <h4>Classe et champ professionnel:</h4>
        <input
          v-model="evaluation.fiche_contrat.champ_professionnel"
          type="text"
          class="ml-2 print-no-border"
        />
      </div>
    </v-container>

    <v-container class="secondary--text mt-2 pa-0">
      <table
        class="text-center"
        style="border-spacing: 10px 0px"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tr>
          <th style="width: 30%">Domaine du socle</th>
          <th style="width: 30%">Activités de référence</th>
          <th style="width: 30%">Parcours/métiers ciblés</th>
        </tr>
        <tr>
          <td class="pa-0">
            <v-textarea
              solo
              v-model="evaluation.fiche_contrat.domaine_socle"
              auto-grow
              hide-details
              flat
              rows="1"
              dense
              full-width
            />
          </td>
          <td class="pa-0">
            <v-textarea
              solo
              v-model="evaluation.fiche_contrat.activite_reference"
              auto-grow
              hide-details
              flat
              rows="1"
              dense
              full-width
            />
          </td>
          <td class="pa-0">
            <v-textarea
              solo
              v-model="evaluation.fiche_contrat.parcours_cible"
              auto-grow
              hide-details
              flat
              rows="1"
              dense
              full-width
            />
          </td>
        </tr>
      </table>
    </v-container>

    <v-container class="secondary--text mt-2 pa-0">
      <div class="table_activities">
        <div class="table_activities__headers">
          <div style="width: 25%" class="table_activities__cell">
            <h4>Activités des élèves</h4>
          </div>
          <div style="width: 25%" class="table_activities__cell">
            <h4>Activités de formation</h4>
          </div>
          <div
            style="width: 50%"
            class="d-flex flex-column table_activities__cell"
          >
            <h4 class="pa-1">Mise en relation avec le socle commun</h4>
            <div class="d-flex table_activities__header_double">
              <h4 style="width: 50%" class="table_activities__cell pa-1">
                Domaines
              </h4>
              <h4 style="width: 50%" class="table_activities__cell pa-1">
                Compétences
              </h4>
            </div>
          </div>
        </div>

        <div
          class="table_activities__row"
          v-for="competence_id in evaluation.competences"
          :key="competence_id"
        >
          <div class="table_activities__cell">
            <div class="table_activities__list_activity">
              <div
                v-for="(activite, id) in evaluation.fiche_contrat
                  .activites_eleves[competence_id]"
                :key="`${competence_id}-${id}`"
                class="table_activities__activity"
              >
                <v-textarea
                  solo
                  v-model="
                    evaluation.fiche_contrat.activites_eleves[competence_id][id]
                  "
                  auto-grow
                  hide-details
                  flat
                  rows="1"
                  dense
                  full-width
                />
                <v-btn
                  x-small
                  icon
                  color="red"
                  class="no-print"
                  style="position: absolute; z-index: 999; right: 0px; top: 0px"
                  @click="() => removeActiviteEleves(competence_id, id)"
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </div>
            </div>

            <div
              class="
                d-flex
                align-center
                justify-center
                ma-0
                pa-0
                no-print
                table_activities__button_add
              "
              :style="
                (evaluation.fiche_contrat.activites_formation[competence_id] &&
                  evaluation.fiche_contrat.activites_formation[competence_id]
                    .length > 0) ||
                (evaluation.fiche_contrat.activites_eleves[competence_id] &&
                  evaluation.fiche_contrat.activites_eleves[competence_id]
                    .length > 0)
                  ? 'border-top: black solid 2px'
                  : 'border-top: none'
              "
            >
              <v-btn
                @click="() => newActiviteEleves(competence_id)"
                icon
                class="no-print"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="table_activities__cell">
            <div class="table_activities__list_activity">
              <template
                v-for="(activite, id) in evaluation.fiche_contrat
                  .activites_formation[competence_id]"
              >
                <div
                  :key="`${competence_id}-${id}`"
                  class="table_activities__activity"
                >
                  <v-textarea
                    solo
                    v-model="
                      evaluation.fiche_contrat.activites_formation[
                        competence_id
                      ][id]
                    "
                    auto-grow
                    hide-details
                    flat
                    rows="1"
                    dense
                    full-width
                  />
                  <v-btn
                    x-small
                    icon
                    color="red"
                    class="no-print"
                    style="
                      position: absolute;
                      z-index: 999;
                      right: 0px;
                      top: 0px;
                    "
                    @click="() => removeActiviteFormation(competence_id, id)"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </div>
              </template>
            </div>

            <div
              class="
                d-flex
                align-center
                justify-center
                ma-0
                pa-0
                no-print
                table_activities__button_add
              "
              :style="
                (evaluation.fiche_contrat.activites_formation[competence_id] &&
                  evaluation.fiche_contrat.activites_formation[competence_id]
                    .length > 0) ||
                (evaluation.fiche_contrat.activites_eleves[competence_id] &&
                  evaluation.fiche_contrat.activites_eleves[competence_id]
                    .length > 0)
                  ? 'border-top: black solid 2px'
                  : 'border-top: none'
              "
            >
              <v-btn
                @click="() => newActiviteFormation(competence_id)"
                icon
                class="no-print"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="table_activities__cell">
            <span class="ma-2">{{
              domaineByCompetence(competence_id).name
            }}</span>
          </div>
          <div class="table_activities__cell">
            <span class="ma-2">{{ competence(competence_id).name }}</span>
          </div>
        </div>
      </div>
    </v-container>

    <v-container class="secondary--text mt-2 pa-0">
      <table
        class="text-center ma-0"
        style="width: 100%; margin: 0"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tr>
          <th>ON DONNE</th>
          <th>ON DEMANDE</th>
          <th>ON EXIGE</th>
        </tr>
        <tr>
          <td class="pa-0">
            <v-textarea
              solo
              v-model="evaluation.fiche_contrat.on_donne"
              auto-grow
              hide-details
              flat
              rows="1"
              dense
              full-width
            />
          </td>
          <td class="pa-0">
            <v-textarea
              solo
              v-model="evaluation.fiche_contrat.on_demande"
              auto-grow
              hide-details
              flat
              rows="1"
              dense
              full-width
            />
          </td>
          <td class="pa-0">
            <v-textarea
              solo
              v-model="evaluation.fiche_contrat.on_exige"
              auto-grow
              hide-details
              flat
              rows="1"
              dense
              full-width
            />
          </td>
        </tr>
      </table>
    </v-container>
    <v-container class="d-flex flex-column">
      <v-btn
        class="rounded-0 no-print ma-2"
        color="secondary"
        @click="() => print()"
      >
        <v-icon medium color="white" class="pr-2"> mdi-printer </v-icon>
        Imprimer
      </v-btn>
    </v-container>
  </div>
</template>


<style  lang="scss">
.fiche_contrat {
  background-color: white;
  max-width: 20cm;
  margin: auto;
  padding: 20px;
  border: gray 1px solid;

  * :not(h1, h4, .v-icon) {
    font-size: 10pt !important;
    line-height: 15px !important;
    font-family: "Roboto", sans-serif;
  }

  .table_activities {
    display: flex;
    flex-direction: column;
    text-align: center;

    .table_activities__headers {
      display: flex;
      width: 100%;
      position: relative;

      .table_activities__header_double {
        width: 100%;
        .table_activities__cell {
          border-bottom: none;
          border-right: none;
          border-left: none;
        }
        .table_activities__cell:last-child {
          border-left: solid black 2px;
        }
      }
    }

    .table_activities__row {
      display: flex;

      .table_activities__cell {
        width: 25%;
        border-top: none;
        display: flex;
        flex-direction: column;
        position: relative;
      }

      .table_activities__list_activity {
        display: flex;
        flex-direction: column;
        width: 100%;
        flex-grow: 1;

        .table_activities__activity {
          position: relative;
          width: 100%;
          border-bottom: black solid 2px;
          flex-grow: 1;
          padding-bottom: 5px;

          .v-textarea {
            padding: 0;
            margin: 0;
            border-radius: 0;
          }
        }

        .table_activities__activity:last-child {
          border-bottom: none;
        }
      }

      .table_activities__button_add {
        border-top: black solid 2px;
        width: 100%;
        height: 40px;
      }
    }

    .table_activities__cell {
      border: solid black 2px;
      border-right: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .table_activities__cell:last-child {
      border-right: solid black 2px;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 2px solid black;
    height: 1px;
    padding: 5px 0;
  }

  input {
    border: black dashed 1px;
    flex-grow: 1;
    height: 25px;
    padding: 0 5px;
    margin: 6px;
    margin-top: -5px !important;
  }

  input,
  .v-textarea {
    font-size: 14px !important;
  }

  hr {
    background-color: rgba($color: #000000, $alpha: 0.6);
    height: 3px;
    box-shadow: none;
    background-color: none;
  }

  .v-text-field__slot {
    margin: 0;
    text-align: center;
  }

  .list-activites {
    height: calc(100% - 40px);
  }

  .v-textarea,
  .v-input {
    height: 100%;
    padding: 5px 0;

    border-radius: 0;
    * {
      border-radius: 0;
      height: 100%;
    }
  }
}
</style>