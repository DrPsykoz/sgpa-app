import { Component, Vue } from 'vue-property-decorator';

import DialogAjout from "@/components/General/DialogAjout.vue";

import { readClasse, readCompetence } from '@/store/main/getters';

import ElevesList from '@/components/classes/sections/ElevesList.vue';
import EvaluationsList from '@/components/classes/sections/EvaluationsList.vue';
import SeancesList from '@/components/classes/sections/SeancesList.vue';
import { INote } from '@/interfaces';

@Component({
    components: {
        DialogAjout, ElevesList, EvaluationsList, SeancesList
    }
})
export default class Evaluation extends Vue {

    public classe_id = '';
    public evaluation_id = '';

    public isLegendDisplayed = false;

    get classe() {
        return readClasse(this.$store)(this.classe_id);
    }

    get evaluation() {
        return this.classe?.evaluations.find((x) => x.id === this.evaluation_id);
    }

    get competence() {
        return (id: string) => readCompetence(this.$store)(id);
    }

    public getHeaders() {
        const headers: { text: string, value: string }[] = [];
        headers.push({ text: "Eleves", value: "eleve" });
        if (this.evaluation !== undefined) {
            this.evaluation.competences.forEach((competence_id) => {
                headers.push({
                    text: this.competence(competence_id).name,
                    value: "note_" + this.competence(competence_id).id,
                });
            });
        }
        return headers;
    }

    public getRows() {
        const rows: any[] = [];

        this.classe?.eleves.forEach((eleve) => {
            const row = {
                eleve: eleve,
            };
            if (this.evaluation !== undefined) {
                this.evaluation.competences.forEach((competence) => {
                    row[competence] = 0;
                });
            }

            rows.push(row);
        });

        return rows;
    }

    public updateNote(notation: INote) {
        notation.note++;
        if (notation.note > 5) notation.note = 0;
    }

    public created() {
        this.classe_id = this.$route.params.classe;
        this.evaluation_id = this.$route.params.evaluation;
    }
}
