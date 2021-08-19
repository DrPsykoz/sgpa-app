import { MainState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';
import { ICompetence } from '@/interfaces';

export const getters = {

    state: (state: MainState) => state,

    classes: (state: MainState) => state.classes,
    classe: (state: MainState) => (id: string) => state.classes.find((x) => x.id === id),

    cycles: (state: MainState) => state.cycles,

    competences: (state: MainState) => {
        const competences: ICompetence[] = [];
        state.cycles.forEach((cycle) => {
            cycle.domaines.forEach((domaine) => {
                domaine.champs.forEach((champ) => {
                    champ.competences.forEach((competence) => {
                        competences.push(competence);
                    })
                })
            })
        })
        return competences;
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

// Notifications
export const readNotifications = read(getters.notifications);
