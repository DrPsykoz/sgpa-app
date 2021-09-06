import { Data } from 'electron/main';
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
    seances: ISeance[] = [];

    public constructor(init?: Partial<IClasse>) {
        super();
        Object.assign(this, init);
    }
}

export class IEleve extends IIdentifiedItem {
    first_name = '';
    last_name = '';

    public constructor(init?: Partial<IEleve>) {
        super();
        Object.assign(this, init);
    }
}

export class IEvaluation extends IIdentifiedItem {
    trimestre: ETrimestre = ETrimestre.Premier;
    annee: EAnnee = EAnnee.Quatrieme;
    competences: string[] = [];
    notes: INote[] = [];
    fiche_contrat: IFicheContrat = new IFicheContrat();

    public constructor(init?: Partial<IEvaluation>) {
        super();
        Object.assign(this, init);
    }
}

export class IFicheContrat {
    intitule_projet = '';
    champ_professionnel = 'Champ habitat';
    domaine_socle = '';
    activite_reference = '';
    parcours_cible = '';
    activites_eleves: Record<string, string[]> = {};
    activites_formation: Record<string, string[]> = {};
    on_donne: string[] = [];
    on_demande: string[] = [];
    on_exige: string[] = [];
}

export class INote extends IIdentifiedItem {
    eleve_id: string;
    competence_id: string;
    note: number;

    public constructor(init?: Partial<INote>) {
        super();
        Object.assign(this, init);
    }
}

export class ICycle extends IIdentifiedItem {
    name = '';
    domaines: IDomaine[] = [];

    public constructor(init?: Partial<ICycle>) {
        super();
        Object.assign(this, init);
    }
}

export class IDomaine extends IIdentifiedItem {
    name = '';
    champs: IChamp[] = [];

    public constructor(init?: Partial<IDomaine>) {
        super();
        Object.assign(this, init);
    }
}

export class IChamp extends IIdentifiedItem {
    name = '';
    competences: ICompetence[] = [];

    public constructor(init?: Partial<IChamp>) {
        super();
        Object.assign(this, init);
    }
}

export class ICompetence extends IIdentifiedItem {
    name = '';

    public constructor(init?: Partial<ICompetence>) {
        super();
        Object.assign(this, init);
    }
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

declare module "vue/types/vue" {
    interface Vue {
        $GlobalUtils: IGlobalUtilities;
        $ElevesUtils: IElevesUtilities;
    }
}

export interface IGlobalUtilities {
    readFromFile: (filepath: string) => any;
    writeToFileSync: (filepath: string, content: string) => boolean;
    getNoteDetails: (note: number) => { name: string, color: string }
    isSame: (obj1: any, obj2: any) => boolean;
}

export interface IElevesUtilities {
    getMoyenne: (classe: IClasse, eleve: IEleve) => number;
}

export class ISeance extends IIdentifiedItem {
    date_debut: Date = new Date();
    date_fin: Date = new Date();
    // Liste d'uuid d'eleves
    absences: string[] = [];
    cahier_texte = '';

    public constructor(init?: Partial<ISeance>) {
        super();
        Object.assign(this, init);
    }
}