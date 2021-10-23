import { Component, Vue } from 'vue-property-decorator';

import DialogAjout from "@/components/General/DialogAjout.vue";

import { readClasse, readCompetence } from '@/store/main/getters';

import ElevesList from '@/components/classes/sections/ElevesList.vue';
import EvaluationsList from '@/components/classes/sections/EvaluationsList.vue';
import SeancesList from '@/components/classes/sections/SeancesList.vue';
@Component({
    components: {
        DialogAjout, ElevesList, EvaluationsList, SeancesList
    }
})
export default class Seance extends Vue {

    public headers = [
        {
            text: 'Eleve',
            value: 'eleve'
        },
        {
            text: 'Absent',
            value: 'is_absent'
        }
    ]

    get classe() {
        return readClasse(this.$store)(this.$route.params.classe);
    }

    get seance() {
        return this.classe?.seances.find((x) => x.id === this.$route.params.seance);
    }

    get eleves() {
        return this.classe?.eleves;
    }

    get competence() {
        return (id: string) => readCompetence(this.$store)(id);
    }

    public isAbsent(id: string) {
        return this.seance?.absences.includes(id);
    }

    public toggleAbsence(id: string) {
        if (this.seance) {
            if (this.isAbsent(id)) {
                this.seance.absences = this.seance.absences.filter((x) => x !== id);
            } else {
                this.seance.absences.push(id);
            }
        }
    }
}
