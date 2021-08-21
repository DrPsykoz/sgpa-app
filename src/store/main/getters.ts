import { MainState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';
import { ICompetence } from '@/interfaces';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

export const getters = {

    state: (state: MainState) => state,

    classes: (state: MainState) => state.classes,
    classe: (state: MainState) => (id: string) => state.classes.find((x) => x.id === id),

    cycles: (state: MainState) => state.cycles,

    competences: (state: MainState) => {
        return state.cycles.map((cycle) => cycle.domaines.map((domaine) => domaine.champs.map((champ) => champ.competences))).flat(Infinity);
    },
    competence: (state: MainState) => (id: string) => {
        const competences: any[] = state.cycles.map((cycle) => cycle.domaines.map((domaine) => domaine.champs.map((champ) => champ.competences))).flat(Infinity);
        return competences.find((x) => x.id === id);
    },
    domaineByCompetence: (state: MainState) => (competence_id: string) => {
        let domaineToReturn = null;
        const domaines: any[] = state.cycles.map((cycle) => cycle.domaines).flat(Infinity);
        domaines.forEach((domaine) => {
            const competences = domaine.champs.map((champ) => champ.competences.map((competence) => competence.id)).flat(Infinity);
            if (competences.includes(competence_id)) {
                domaineToReturn = domaine;
            }
        })
        return domaineToReturn;
    },


    notifications: (state: MainState) => state.notifications,


};

const { read } = getStoreAccessors<MainState, State>('');

export const readCurrentState = read(getters.state);

// Classes
export const readClasses = read(getters.classes);
export const readClasse = read(getters.classe);

export const readCycles = read(getters.cycles);

export const readCompetences = read(getters.competences);
export const readCompetence = read(getters.competence);

// Domaines
export const readDomaineByCompetence = read(getters.domaineByCompetence);

// Notifications
export const readNotifications = read(getters.notifications);
