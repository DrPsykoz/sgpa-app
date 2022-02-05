import { IClasse } from '@/interfaces';
import { Component, Vue } from 'vue-property-decorator';

import DialogAjout from "@/components/General/DialogAjout.vue";

import { readClasses, readCycles, readSelectedClasse } from '@/store/main/getters';
import { dispatchCreateClasse, dispatchRemoveClasse } from '@/store/main/actions';

import ElevesList from '@/components/classes/sections/ElevesList.vue';
import EvaluationsList from '@/components/classes/sections/EvaluationsList.vue';
import SeancesList from '@/components/classes/sections/SeancesList.vue';
import { commitSetSelectedClasse } from '@/store/main/mutations';

@Component({
  components: {
    DialogAjout, ElevesList, EvaluationsList, SeancesList
  }
})
export default class Classes extends Vue {

  public dialogConfirmDeleteClasse = false;
  public classe_to_delete: IClasse | null = null;

  public display: Record<string, unknown> = {
    configuration: true,
    eleves: true,
    evaluations: true,
    seances: true,
  };

  public dialogAjoutEleve = false;

  get classes() {
    return readClasses(this.$store);
  }

  get cycles() {
    return readCycles(this.$store);
  }

  get current_classe() {
    return readSelectedClasse(this.$store);
  }

  public selectClasse(classe){
    commitSetSelectedClasse(this.$store, classe);
  }

  public resetCurrent() {
    if (this.classes.length > 0) {
      commitSetSelectedClasse(this.$store, this.classes[0]);
    } else {
      commitSetSelectedClasse(this.$store, null);
    }
  }

  public getMoyenne(id: number) {
    return 5;
  }

  public getNote(note: number) {
    return this.$GlobalUtils.getNoteDetails(note);
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
    dispatchCreateClasse(this.$store, { name: 'Nouvelle session' } as IClasse);
  }




  public deleteClasse(classe) {
    this.classe_to_delete = classe;
    this.dialogConfirmDeleteClasse = true;
  }

  public confirmDeleteClasse() {
    if (this.classe_to_delete !== null) {
      dispatchRemoveClasse(this.$store, { id: this.classe_to_delete.id });
    }
    this.dialogConfirmDeleteClasse = false;
  }

  public created() {
    window.scrollTo(0, 0);

    const setClasseInterval = setInterval(() => {
      if (!this.current_classe && this.classes && this.classes.length > 0) {
        commitSetSelectedClasse(this.$store, this.classes[0]);
        clearInterval(setClasseInterval);
      }
    }, 100);
  }
}
