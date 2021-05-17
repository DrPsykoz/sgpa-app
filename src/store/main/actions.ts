import { IClasse, ICycle, IEleve, IEvaluation } from '@/interfaces';
import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { State } from '../state';
import { commitSetClasse, commitSetCycle, commitSetEleve, commitSetEvaluation } from './mutations';
import { MainState } from './state';
import { v4 as uuidv4 } from 'uuid';

type MainContext = ActionContext<MainState, State>;

export const actions = {
    async actionCreateClasse(context: MainContext, payload: { name: string }) {
        const classe = {} as IClasse;
        classe.id = uuidv4();
        classe.name = payload.name;
        classe.eleves = [];
        classe.evaluations = [];
        commitSetClasse(context, classe);
    },
    async actionCreateCycle(context: MainContext, payload: { name: string }) {
        const cycle = {} as ICycle;
        cycle.id = uuidv4();
        cycle.name = payload.name;
        cycle.domaines = [];
        commitSetCycle(context, cycle);
    },
    async actionCreateEleve(context: MainContext, payload: { classe: IClasse, eleve: IEleve }) {
        const eleve = { ...payload.eleve };
        eleve.id = uuidv4();
        commitSetEleve(context, {
            classe: payload.classe, eleve
        });
    },
    async actionCreateEvaluation(context: MainContext, payload: { classe: IClasse, evaluation: IEvaluation }) {
        const evaluation = { ...payload.evaluation };
        evaluation.id = uuidv4();
        commitSetEvaluation(context, {
            classe: payload.classe, evaluation
        });
    },
};

const { dispatch } = getStoreAccessors<MainState, State>('');

export const dispatchCreateClasse = dispatch(actions.actionCreateClasse);
export const dispatchCreateCycle = dispatch(actions.actionCreateCycle);

export const dispatchCreateEleve = dispatch(actions.actionCreateEleve);
export const dispatchCreateEvalutation = dispatch(actions.actionCreateEvaluation);
