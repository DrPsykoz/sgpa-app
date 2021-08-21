import { ENotificationType, IChamp, IClasse, ICompetence, ICycle, IDomaine, IEleve, IEvaluation, INotification } from '@/interfaces';
import { MainState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';
import { Main } from 'electron';
import { dispatchAddNotification } from './actions';

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

    setDomaine(state: MainState, payload: { cycle: ICycle, domaine: IDomaine }) {
        const cycle = state.cycles.find((x) => x.id === payload.cycle.id);
        if (cycle) {
            const domaines = cycle.domaines.filter((x) => x.id !== payload.domaine.id);
            domaines.push(payload.domaine);
            cycle.domaines = domaines;
        }
    },
    setChamp(state: MainState, payload: { cycle: ICycle, domaine: IDomaine, champ: IChamp }) {
        const cycle = state.cycles.find((x) => x.id === payload.cycle.id);
        if (cycle) {
            const domaine = cycle.domaines.find((x) => x.id === payload.domaine.id);
            if (domaine) {
                const champs = domaine.champs.filter((x) => x.id !== payload.champ.id);
                champs.push(payload.champ);
                domaine.champs = champs;
            }
        }
    },
    setCompetence(state: MainState, payload: { cycle: ICycle, domaine: IDomaine, champ: IChamp, competence: ICompetence }) {
        const cycle = state.cycles.find((x) => x.id === payload.cycle.id);
        if (cycle) {
            const domaine = cycle.domaines.find((x) => x.id === payload.domaine.id);
            if (domaine) {
                const champ = domaine.champs.find((x) => x.id === payload.champ.id);
                if (champ) {
                    const competences = champ.competences.filter((x) => x.id !== payload.competence.id);
                    competences.push(payload.competence);
                    champ.competences = competences;
                }

            }
        }
    },

    /*
     * Eleves
     */
    setEleve(state: MainState, payload: { classe: IClasse, eleve: IEleve }) {
        const classe = state.classes.find((x) => x.id === payload.classe.id);
        if (classe) {
            const eleves = classe.eleves.filter((x) => x.id !== payload.eleve.id);
            eleves.push(payload.eleve);
            classe.eleves = eleves;
        }
    },
    removeEleve(state: MainState, payload: { classe: IClasse, eleve_id: string }) {
        const classe = state.classes.find((x) => x.id === payload.classe.id);
        if (classe) {
            classe.eleves = classe.eleves.filter((x) => x.id !== payload.eleve_id);
            console.log(classe.eleves);
        } else {
            console.log('classe not found')
        }
    },

    /*
     * Evaluations
     */
    setEvaluation(state: MainState, payload: { classe: IClasse, evaluation: IEvaluation }) {
        const classe = state.classes.find((x) => x.id === payload.classe.id);
        if (classe) {
            const evaluations = classe.evaluations.filter((x) => x.id !== payload.evaluation.id);
            evaluations.push(payload.evaluation);
            classe.evaluations = evaluations;
        }
    },
    removeEvaluation(state: MainState, payload: { classe: IClasse, evaluation_id: string }) {
        const classe = state.classes.find((x) => x.id === payload.classe.id);
        if (classe) {
            const evaluations = classe.evaluations.filter((x) => x.id !== payload.evaluation_id);
            classe.evaluations = evaluations;
        }
    },

    addNotification(state: MainState, payload: { notification: INotification }) {
        state.notifications.push(payload.notification);
    },
    removeNotification(state: MainState, payload: { id: any }) {
        state.notifications = state.notifications.filter((x) => x.id !== payload.id);
    },
    clearNotifications(state: MainState) {
        state.notifications = [];
    }
};

const { commit } = getStoreAccessors<MainState, State>('');

export const commitSetCurrentState = commit(mutations.setCurrentState);

// Notifications
export const commitAddNotification = commit(mutations.addNotification);
export const commitRemoveNotification = commit(mutations.removeNotification);
export const commitClearNotifications = commit(mutations.clearNotifications);

// Evaluations
export const commitSetEvaluation = commit(mutations.setEvaluation);
export const commitRemoveEvaluation = commit(mutations.removeEvaluation);

// Eleves
export const commitSetEleve = commit(mutations.setEleve);
export const commitRemoveEleve = commit(mutations.removeEleve);

// Cycles
export const commitSetCycles = commit(mutations.setCycles);
export const commitSetCycle = commit(mutations.setCycle);
export const commitRemoveCycle = commit(mutations.removeCycle);

// Classes
export const commitSetClasses = commit(mutations.setClasses);
export const commitSetClasse = commit(mutations.setClasse);
export const commitRemoveClasse = commit(mutations.removeClasse);



export const commitSetDomaine = commit(mutations.setDomaine);
export const commitSetChamp = commit(mutations.setChamp);
export const commitSetCompetence = commit(mutations.setCompetence);
