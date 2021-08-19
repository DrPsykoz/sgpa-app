import { v4 as uuidv4 } from 'uuid';
export class IIdentifiedItem {
    id: string = uuidv4();
}

export class IData {
    classes: IClasse[] = [];
    cycles: ICycle[] = [];
}

export class IClasse extends IIdentifiedItem {
    name = '';
    eleves: IEleve[] = [];
    evaluations: IEvaluation[] = [];
}

export class IEleve extends IIdentifiedItem {
    first_name = '';
    last_name = '';
}

export class IEvaluation extends IIdentifiedItem {
    trimestre: ETrimestre = ETrimestre.Premier;
    annee: EAnnee = EAnnee.Quatrieme;
    competences: ICompetence[] = [];
    notes: INote[] = [];
}

export class INote extends IIdentifiedItem {
    evaluation: IEvaluation;
    eleve: IEleve;
    competence: ICompetence;
    note: number;
}

export class ICycle extends IIdentifiedItem {
    name = '';
    domaines: IDomaine[] = [];
}

export class IDomaine extends IIdentifiedItem {
    name = '';
    champs: IChamp[] = [];
}

export class IChamp extends IIdentifiedItem {
    name = '';
    competences: ICompetence[] = [];
}

export class ICompetence extends IIdentifiedItem {
    name = '';
}

export enum ETrimestre {
    Premier = "1er",
    Second = "2eme",
    Troisieme = "3eme"
}

export enum EAnnee {
    Quatrieme = "4eme",
    Troisieme = "3eme"
}

export class INotification extends IIdentifiedItem {
    public text = '';
    public type: ENotificationType;
    public time = 5;

    public constructor(init?: Partial<INotification>) {
        super();
        Object.assign(this, init);
    }
}

export enum ENotificationType {
    ERROR = "error", SUCCESS = "success", INFO = "info"
}
