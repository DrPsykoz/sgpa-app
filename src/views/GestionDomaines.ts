import { Component, Vue } from 'vue-property-decorator';
import { readClasses, readCycles } from '@/store/main/getters';

import { IChamp, ICompetence, ICycle, IDomaine } from '@/interfaces'

import DialogItemData from "@/components/global/dialogs/DialogItemData.vue";
import { dispatchCreateChamp, dispatchCreateCompetence, dispatchCreateCycle, dispatchCreateDomaine } from '@/store/main/actions';

@Component({
    components: {
        DialogItemData
    }
})
export default class GestionDomaines extends Vue {

    public dialogNewCycle = false;
    public dialogNewDomaine = false;
    public dialogNewChamp = false;
    public dialogNewCompetence = false;

    get classes() { return readClasses(this.$store); }
    get cycles() { return readCycles(this.$store); }

    public getNewCycle() { return new ICycle(); }
    public registerNewCycle(data) { dispatchCreateCycle(this.$store, { cycle: data }); }

    public getNewDomaine() { return new IDomaine(); }
    public registerNewDomaine(cycle, data) { dispatchCreateDomaine(this.$store, { cycle, domaine: data }); }

    public getNewChamp() { return new IChamp(); }
    public registerNewChamp(cycle, domaine, data) { dispatchCreateChamp(this.$store, { cycle, domaine, champ: data }); }

    public getNewCompetence() { return new ICompetence(); }
    public registerNewCompetence(cycle, domaine, champ, data) { dispatchCreateCompetence(this.$store, { cycle, domaine, champ, competence: data }); }


    public mounted() {
        window.scrollTo(0, 0);
        console.log(this.cycles)
    }
}
