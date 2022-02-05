import { ENotificationType, IChamp, IClasse, ICompetence, ICycle, IDomaine, IEleve, IEvaluation, INotification, ISeance } from '@/interfaces';
import { MainState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
    setCurrentState(state: MainState, payload: MainState) {
        state.classes = payload.classes;
        state.cycles = payload.cycles;
    },

    /* 
     *   Classes 
     */
    setClasses(state: MainState, payload: IClasse[]) { state.classes = payload; },
    setClasse(state: MainState, payload: IClasse) {
        const classes = state.classes.filter((x) => x.id !== payload.id);
        classes.push(payload);
        state.classes = classes;
    },
    removeClasse(state: MainState, payload: IClasse) {
        state.classes = state.classes.filter((x) => x.id !== payload.id);
    },

    /*
     *   Cycles
     */
    setCycles(state: MainState, payload: ICycle[]) { state.cycles = payload; },
    setCycle(state: MainState, payload: ICycle) {
        const cycles = state.cycles.filter((x) => x.id !== payload.id);
        cycles.push(payload);
        state.cycles = cycles;
    },
    removeCycle(state: MainState, payload: ICycle) { state.cycles = state.cycles.filter((x) => x.id !== payload.id); },
    setSelectedClasse(state: MainState, payload: IClasse | null) { state.selected_classe_uuid = payload ? payload.id : ''; },

    /*
     *   Domaines
     */
    setDomaine(state: MainState, payload: { cycle: ICycle, domaine: IDomaine }) {
        const cycle = state.cycles.find((x) => x.id === payload.cycle.id);
        if (cycle) {
            const domaines = cycle.domaines.filter((x) => x.id !== payload.domaine.id);
            domaines.push(payload.domaine);
            cycle.domaines = domaines;
        }
    },
    removeDomaine(state: MainState, payload: { cycle: ICycle, domaine: IDomaine }) {
        const cycle = state.cycles.find((x) => x.id === payload.cycle.id);
        if (cycle) {
            cycle.domaines = cycle.domaines.filter((x) => x.id !== payload.domaine.id);
        }
    },

    /*
     *   Champs
     */
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
    removeChamp(state: MainState, payload: { cycle: ICycle, domaine: IDomaine, champ: IChamp }) {
        const cycle = state.cycles.find((x) => x.id === payload.cycle.id);
        if (cycle) {
            const domaine = cycle.domaines.find((x) => x.id === payload.domaine.id);
            if (domaine) {
                domaine.champs = domaine.champs.filter((x) => x.id !== payload.champ.id);
            }
        }
    },

    /*
     *   Competences
     */
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
    removeCompetence(state: MainState, payload: { cycle: ICycle, domaine: IDomaine, champ: IChamp, competence: ICompetence }) {
        const cycle = state.cycles.find((x) => x.id === payload.cycle.id);
        if (cycle) {
            const domaine = cycle.domaines.find((x) => x.id === payload.domaine.id);
            if (domaine) {
                const champ = domaine.champs.find((x) => x.id === payload.champ.id);
                if (champ) {
                    champ.competences = champ.competences.filter((x) => x.id !== payload.competence.id);
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

    /*
     * Notifications
     */
    addNotification(state: MainState, payload: { notification: INotification }) {
        state.notifications.push(payload.notification);
    },
    removeNotification(state: MainState, payload: { id: any }) {
        state.notifications = state.notifications.filter((x) => x.id !== payload.id);
    },
    clearNotifications(state: MainState) {
        state.notifications = [];
    },

    /*
     * Seances
     */
    setSeance(state: MainState, payload: { classe: IClasse, seance: ISeance }) {
        const classe = state.classes.find((x) => x.id === payload.classe.id);
        if (classe) {
            const seances = classe.seances.filter((x) => x.id !== payload.seance.id);
            seances.push(payload.seance);
            classe.seances = seances;
        } else {
            throw new Error("Classe introuvable.");
        }
    },
    removeSeance(state: MainState, payload: { classe: IClasse, seance: ISeance }) {
        const classe = state.classes.find((x) => x.id === payload.classe.id);
        if (classe) {
            classe.seances = classe.seances.filter((x) => x.id !== payload.seance.id);
        }
    },
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

// Classes
export const commitSetClasses = commit(mutations.setClasses);
export const commitSetClasse = commit(mutations.setClasse);
export const commitRemoveClasse = commit(mutations.removeClasse);
export const commitSetSelectedClasse = commit(mutations.setSelectedClasse);

// Cycles
export const commitSetCycles = commit(mutations.setCycles);
export const commitSetCycle = commit(mutations.setCycle);
export const commitRemoveCycle = commit(mutations.removeCycle);

// Domaines
export const commitSetDomaine = commit(mutations.setDomaine);
export const commitRemoveDomaine = commit(mutations.removeDomaine);

// Champs
export const commitSetChamp = commit(mutations.setChamp);
export const commitRemoveChamp = commit(mutations.removeChamp);

// Competences
export const commitSetCompetence = commit(mutations.setCompetence);
export const commitRemoveCompetence = commit(mutations.removeCompetence);

// Seances
export const commitSetSeance = commit(mutations.setSeance);
export const commitRemoveSeance = commit(mutations.removeSeance);
