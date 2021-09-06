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
export default class Seance extends Vue {

    public classe_id = '';
    public seance_id = '';

    public isLegendDisplayed = false;

    get classe() {
        return readClasse(this.$store)(this.classe_id);
    }

    get seance() {
        return this.classe?.seances.find((x) => x.id === this.seance_id);
    }

    get competence() {
        return (id: string) => readCompetence(this.$store)(id);
    }

    public created() {
        this.classe_id = this.$route.params.classe;
        this.seance_id = this.$route.params.seance;
    }
}
