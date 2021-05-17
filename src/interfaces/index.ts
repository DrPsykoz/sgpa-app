export interface IIdentifiedItem {
    id: string;
}

export interface IData {
    classes: IClasse[];
    cycles: ICycle[];
}

export interface IClasse extends IIdentifiedItem {
    name: string;
    eleves: IEleve[];
    evaluations: IEvaluation[];
}

export interface IEleve extends IIdentifiedItem {
    first_name: string;
    last_name: string;
}

export interface IEvaluation extends IIdentifiedItem {
    trimestre: string;
    annee: string;
    competences: ICompetence[];
    notes: INote[];
}

export interface INote {
    eleveID: number;
    competence: ICompetence;
    note: number;
}

export interface ICycle extends IIdentifiedItem {
    name: string;
    domaines: IDomaine[];
}

export interface IDomaine extends IIdentifiedItem {
    name: string;
    champs: IChamp[];
}

export interface IChamp extends IIdentifiedItem {
    name: string;
    competences: ICompetence[];
}

export interface ICompetence extends IIdentifiedItem {
    name: string;
}
