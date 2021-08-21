import { Component, Vue } from 'vue-property-decorator';

import DialogAjout from "@/components/General/DialogAjout.vue";

import { readClasse, readCompetence, readDomaineByCompetence } from '@/store/main/getters';

import ElevesList from '@/components/classes/sections/ElevesList.vue';
import EvaluationsList from '@/components/classes/sections/EvaluationsList.vue';
import SeancesList from '@/components/classes/sections/SeancesList.vue';

import { ipcRenderer } from 'electron';

@Component({
    components: {
        DialogAjout, ElevesList, EvaluationsList, SeancesList
    }
})
export default class FicheContrat extends Vue {

    public classe_id = '';
    public evaluation_id = '';

    get classe() {
        return readClasse(this.$store)(this.classe_id);
    }

    get evaluation() {
        return this.classe?.evaluations.find((x) => x.id === this.evaluation_id);
    }

    get competence() {
        return (id: string) => readCompetence(this.$store)(id);
    }

    get domaineByCompetence() {
        return (competence_id: string) => readDomaineByCompetence(this.$store)(competence_id);
    }

    public print() {
        if (this.evaluation) {
            const fiche_contrat = this.evaluation.fiche_contrat;

            Object.keys(fiche_contrat.activites_eleves).forEach((key) => {
                for (const value in fiche_contrat.activites_eleves[key]) {
                    if (value.trim().length === 0) {
                        fiche_contrat.activites_eleves[key].splice(fiche_contrat.activites_eleves[key].indexOf(value), 1);
                    }
                }
            })


        }
        ipcRenderer.send('print-to-pdf');
    }

    public newActiviteEleves(competence_id: string) {
        if (this.evaluation) {
            if (!this.evaluation.fiche_contrat.activites_eleves[competence_id]) {
                this.$set(this.evaluation.fiche_contrat.activites_eleves, competence_id, []);
            }
            this.evaluation.fiche_contrat.activites_eleves[competence_id].push(' ');
        }
    }

    public removeActiviteEleves(competence_id: string, id: number) {
        this.evaluation?.fiche_contrat.activites_eleves[competence_id].splice(id, 1);
    }

    public newActiviteFormation(competence_id: string) {
        if (this.evaluation) {
            if (!this.evaluation.fiche_contrat.activites_formation[competence_id]) {
                this.$set(this.evaluation.fiche_contrat.activites_formation, competence_id, []);
            }
            this.evaluation.fiche_contrat.activites_formation[competence_id].push(' ');
        }
    }

    public removeActiviteFormation(competence_id: string, id: number) {
        this.evaluation?.fiche_contrat.activites_formation[competence_id].splice(id, 1);
    }

    public auto_grow(event) {
        event.target.style.height = "5px";
        event.target.style.height = event.target.scrollHeight + "px";
    }

    public created() {
        this.classe_id = this.$route.params.classe;
        this.evaluation_id = this.$route.params.evaluation;
    }
}
