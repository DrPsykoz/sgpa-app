import { IClasse, ICycle, IEleve, IEvaluation } from '@/interfaces';
import { MainState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
    setCurrentState(state: MainState, payload: MainState) {
        state.classes = payload.classes;
        state.cycles = payload.cycles;
    },

    setClasses(state: MainState, payload: IClasse[]) {
        state.classes = payload;
    },
    setClasse(state: MainState, payload: IClasse) {
        const classes = state.classes.filter((x) => x.id !== payload.id);
        classes.push(payload);
        state.classes = classes;
    },
    removeClasse(state: MainState, payload: IClasse) {
        state.classes = state.classes.filter((x) => x.id !== payload.id);
    },

    setCycles(state: MainState, payload: ICycle[]) {
        state.cycles = payload;
    },
    setCycle(state: MainState, payload: ICycle) {
        const cycles = state.cycles.filter((x) => x.id !== payload.id);
        cycles.push(payload);
        state.cycles = cycles;
    },
    removeCycle(state: MainState, payload: ICycle) {
        state.cycles = state.cycles.filter((x) => x.id !== payload.id);
    },
    setEleve(state: MainState, payload: { classe: IClasse, eleve: IEleve }) {
        const classe = state.classes.find((x) => x.id === payload.classe.id);
        if (classe) {
            const eleves = classe.eleves.filter((x) => x.id !== payload.eleve.id);
            eleves.push(payload.eleve);
            classe.eleves = eleves;
        }
    },
    removeEleve(state: MainState, payload: { classe: IClasse, eleve: IEleve }) {
        const classe = state.classes.find((x) => x.id === payload.classe.id);
        if (classe) {
            classe.eleves = classe.eleves.filter((x) => x.id !== payload.eleve.id);
        }
    },


    setEvaluation(state: MainState, payload: { classe: IClasse, evaluation: IEvaluation }) {
        const classe = state.classes.find((x) => x.id === payload.classe.id);
        if (classe) {
            const evaluations = classe.evaluations.filter((x) => x.id !== payload.evaluation.id);
            evaluations.push(payload.evaluation);
            classe.evaluations = evaluations;
        }
    }
};

const { commit } = getStoreAccessors<MainState, State>('');

export const commitSetCurrentState = commit(mutations.setCurrentState);

export const commitSetClasses = commit(mutations.setClasses);
export const commitSetClasse = commit(mutations.setClasse);
export const commitRemoveClasse = commit(mutations.removeClasse);

export const commitSetCycles = commit(mutations.setCycles);
export const commitSetCycle = commit(mutations.setCycle);
export const commitRemoveCycle = commit(mutations.removeCycle);

export const commitSetEleve = commit(mutations.setEleve);
export const commitRemoveEleve = commit(mutations.removeEleve);

export const commitSetEvaluation = commit(mutations.setEvaluation);