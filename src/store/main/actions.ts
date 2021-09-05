import { ENotificationType, IChamp, IClasse, ICompetence, ICycle, IDomaine, IEleve, IEvaluation, INotification } from '@/interfaces';
import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { State } from '../state';
import { commitAddNotification, commitClearNotifications, commitRemoveChamp, commitRemoveClasse, commitRemoveCompetence, commitRemoveCycle, commitRemoveDomaine, commitRemoveEleve, commitRemoveEvaluation, commitRemoveNotification, commitSetChamp, commitSetClasse, commitSetCompetence, commitSetCycle, commitSetDomaine, commitSetEleve, commitSetEvaluation } from './mutations';
import { MainState } from './state';
import { v4 as uuidv4 } from 'uuid';
import { readClasse } from './getters';

type MainContext = ActionContext<MainState, State>;

export const actions = {
    /*
     *  Notifications
     */
    async actionAddNotification(context: MainContext, payload: { notification: INotification }) {
        commitAddNotification(context, payload);
        setTimeout(() => {
            commitRemoveNotification(context, { id: payload.notification.id });
        }, payload.notification.time * 1000);
    },
    async actionRemoveNotification(context: MainContext, payload: { id: any }) {
        commitRemoveNotification(context, payload);
    },
    async actionClearNotifications(context: MainContext) {
        commitClearNotifications(context);
    },

    /*
     *  Classes 
     */
    async actionCreateClasse(context: MainContext, payload: { name: string }) {
        const classe = {} as IClasse;
        classe.id = uuidv4();
        classe.name = payload.name;
        classe.eleves = [];
        classe.evaluations = [];
        commitSetClasse(context, classe);
    },
    async actionRemoveClasse(context: MainContext, payload: { id: any }) {
        const classe = readClasse(context)(payload.id);
        if (classe) {
            if (classe.eleves.length > 0) {
                dispatchAddNotification(context, {
                    notification: new INotification({
                        text: 'Impossible de supprimer une classe qui contient encore des eleves.',
                        type: ENotificationType.ERROR,
                    })
                });
                return;
            }
            commitRemoveClasse(context, classe);
        }
    },

    /*
     *  Evaluations
     */
    async actionCreateEvaluation(context: MainContext, payload: { classe: IClasse, evaluation: IEvaluation }) {
        commitSetEvaluation(context, payload);
    },
    async actionRemoveEvaluation(context: MainContext, payload: { classe: IClasse, evaluation_id: string }) {
        commitRemoveEvaluation(context, payload);
    },

    /*
     *  Eleves
     */
    async actionCreateEleve(context: MainContext, payload: { classe: IClasse, eleve: IEleve }) {
        if (!payload.eleve.first_name || payload.eleve.first_name.length === 0) {
            dispatchAddNotification(context, {
                notification: new INotification({ text: 'Impossible de creer un eleve sans prenom.', type: ENotificationType.ERROR }),
            });
            return;
        }
        if (!payload.eleve.last_name || payload.eleve.last_name.length === 0) {
            dispatchAddNotification(context, {
                notification: new INotification({ text: 'Impossible de creer un eleve sans nom de famille.', type: ENotificationType.ERROR }),
            });
            return;
        }
        commitSetEleve(context, payload);
        return;
    },
    async actionRemoveEleve(context: MainContext, payload: { classe: IClasse, eleve_id: string }) {
        commitRemoveEleve(context, payload);
    },

    async actionCreateCycle(context: MainContext, payload: { cycle: ICycle }) {
        commitSetCycle(context, payload.cycle);
    },
    async actionCreateDomaine(context: MainContext, payload: { cycle: ICycle, domaine: IDomaine }) {
        commitSetDomaine(context, { cycle: payload.cycle, domaine: payload.domaine });
    },
    async actionCreateChamp(context: MainContext, payload: { cycle: ICycle, domaine: IDomaine, champ: IChamp }) {
        commitSetChamp(context, { cycle: payload.cycle, domaine: payload.domaine, champ: payload.champ });
    },
    async actionCreateCompetence(context: MainContext, payload: { cycle: ICycle, domaine: IDomaine, champ: IChamp, competence: ICompetence }) {
        commitSetCompetence(context, { cycle: payload.cycle, domaine: payload.domaine, champ: payload.champ, competence: payload.competence });
    },

    async actionRemoveCycle(context: MainContext, payload: { cycle: ICycle }) {
        commitRemoveCycle(context, payload.cycle);
    },
    async actionRemoveDomaine(context: MainContext, payload: { cycle: ICycle, domaine: IDomaine }) {
        commitRemoveDomaine(context, { cycle: payload.cycle, domaine: payload.domaine });
    },
    async actionRemoveChamp(context: MainContext, payload: { cycle: ICycle, domaine: IDomaine, champ: IChamp }) {
        commitRemoveChamp(context, { cycle: payload.cycle, domaine: payload.domaine, champ: payload.champ });
    },
    async actionRemoveCompetence(context: MainContext, payload: { cycle: ICycle, domaine: IDomaine, champ: IChamp, competence: ICompetence }) {
        commitRemoveCompetence(context, { cycle: payload.cycle, domaine: payload.domaine, champ: payload.champ, competence: payload.competence });
    },


};

const { dispatch } = getStoreAccessors<MainState, State>('');


export const dispatchCreateCycle = dispatch(actions.actionCreateCycle);
export const dispatchCreateDomaine = dispatch(actions.actionCreateDomaine);
export const dispatchCreateChamp = dispatch(actions.actionCreateChamp);
export const dispatchCreateCompetence = dispatch(actions.actionCreateCompetence);


export const dispatchRemoveCycle = dispatch(actions.actionRemoveCycle);
export const dispatchRemoveDomaine = dispatch(actions.actionRemoveDomaine);
export const dispatchRemoveChamp = dispatch(actions.actionRemoveChamp);
export const dispatchRemoveCompetence = dispatch(actions.actionRemoveCompetence);




// Notifications
export const dispatchAddNotification = dispatch(actions.actionAddNotification);
export const dispatchRemoveNotification = dispatch(actions.actionRemoveNotification);

// Classes
export const dispatchCreateClasse = dispatch(actions.actionCreateClasse);
export const dispatchRemoveClasse = dispatch(actions.actionRemoveClasse);

// Evaluations
export const dispatchCreateEvaluation = dispatch(actions.actionCreateEvaluation);
export const dispatchRemoveEvaluation = dispatch(actions.actionRemoveEvaluation);

// Eleves
export const dispatchCreateEleve = dispatch(actions.actionCreateEleve);
export const dispatchRemoveEleve = dispatch(actions.actionRemoveEleve);