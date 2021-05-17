import { IClasse, IData, IEleve } from '@/interfaces';
import { Component, Vue, Prop } from 'vue-property-decorator';

import DialogAjoutEleve from "@/components/Classes/DialogAjoutEleve.vue";
import DialogAjoutEvaluation from "@/components/Classes/DialogAjoutEvaluation.vue";
import DialogAjout from "@/components/General/DialogAjout.vue";

import * as utils from '@/utils';
import { readClasses, readCycles } from '@/store/main/getters';
import { dispatchCreateClasse } from '@/store/main/actions';
import { commitRemoveClasse, commitRemoveEleve } from '@/store/main/mutations';

@Component({
  components: {
    DialogAjoutEleve, DialogAjoutEvaluation, DialogAjout
  }
})
export default class Classes extends Vue {

  public dialogConfirmDeleteClasse = false;
  public classe_to_delete: IClasse | null = null;

  public dialogConfirmRemoveEleve = false;
  public eleve_to_remove: IEleve | null = null;

  public display: Record<string, unknown> = {
    configuration: true,
    eleves: true,
    evaluations: true,
    seances: true,
  };

  public current_classe: IClasse | null = null;
  public dialogAjoutEleve = false;

  public headers = [
    { text: "Nom", value: "last_name" },
    { text: "Prenom", value: "first_name" },
    { text: "Moyenne", value: "moyenne" },
    { text: "Actions", value: "actions" },
  ];

  public headersEvalutations = [
    { text: "Année", value: "annee" },
    { text: "Trimestre", value: "trimestre" },
    { text: "Competences evaluées", value: "competences" },
    { text: "Actions", value: "actions" },
  ]

  public headersSceances = [
    { text: "Date de début", value: "date_debut" },
    { text: "Date de fin", value: "date_fin" },
    { text: "Actions", value: "actions" },
  ]

  get classes() {
    return readClasses(this.$store);
  }

  get cycles() {
    return readCycles(this.$store);
  }

  public resetCurrent() {
    if (this.classes.length > 0) {
      this.current_classe = this.classes[0];
    } else {
      this.current_classe = null;
    }
  }

  public getMoyenne(id: number) {
    return 5;
  }

  public getNote(note: number) {
    return utils.getNote(note);
  }

  // public getMoyenne(eleveID: number) {
  //   if(this.current_classe !== null){
  //     if (this.current_classe.evaluations.length === 0) return "Aucune notes";
  //     let total = 0;
  //     let notes = 0;
  //     this.current_classe.evaluations.forEach((evaluation) => {
  //       evaluation.competences.forEach((competence) => {
  //         const notesList = evaluation.notes.filter(
  //           (x) =>
  //             x.eleveID == eleveID &&
  //             JSON.stringify(x.competence) === JSON.stringify(competence)
  //         );
  //         notesList.forEach((noteObj) => {
  //           if (noteObj.note != 0) {
  //             total += noteObj.note;
  //             notes++;
  //           }
  //         });
  //       });
  //     });
  //     return total / notes;
  //   } else {
  //     return 0;
  //   }
  // }

  public addNewClasse() {
    dispatchCreateClasse(this.$store, { name: 'Nouvelle classe' } as IClasse);
  }

  public deleteClasse(classe) {
    this.classe_to_delete = classe;
    this.dialogConfirmDeleteClasse = true;
  }

  public confirmDeleteClasse() {
    if (this.classe_to_delete !== null) {
      commitRemoveClasse(this.$store, this.classe_to_delete);
    }
    this.dialogConfirmDeleteClasse = false;
  }

  public removeEleve(eleve) {
    this.eleve_to_remove = eleve;
    this.dialogConfirmRemoveEleve = true;
  }

  public confirmRemoveEleve() {
    if (this.current_classe !== null && this.eleve_to_remove !== null) {
      commitRemoveEleve(this.$store, { classe: this.current_classe, eleve: this.eleve_to_remove });
    }
    this.dialogConfirmRemoveEleve = false;
  }

  public mounted() {
    this.current_classe = this.classes[0] || null;
  }
}
