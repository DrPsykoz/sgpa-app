import { Component, Vue } from 'vue-property-decorator';
import { readClasses, readCycles } from '@/store/main/getters';

import { IChamp, ICompetence, ICycle, IDomaine } from '@/interfaces'

import DialogItemData from "@/components/global/dialogs/DialogItemData.vue";
import { dispatchCreateChamp, dispatchCreateCompetence, dispatchCreateCycle, dispatchCreateDomaine, dispatchRemoveChamp, dispatchRemoveCompetence, dispatchRemoveCycle, dispatchRemoveDomaine } from '@/store/main/actions';

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

    public keysTranslation = {
        name: 'Nom'
    };

    get classes() { return readClasses(this.$store); }
    get cycles() { return readCycles(this.$store); }

    public getNewCycle() { return new ICycle(); }
    public registerNewCycle(data) { dispatchCreateCycle(this.$store, { cycle: data }); }
    public deleteCycle(cycle) { dispatchRemoveCycle(this.$store, { cycle }) }

    public getNewDomaine() { return new IDomaine(); }
    public registerNewDomaine(cycle, data) { dispatchCreateDomaine(this.$store, { cycle, domaine: data }); }
    public deleteDomaine(cycle, domaine) { dispatchRemoveDomaine(this.$store, { cycle, domaine }) }

    public getNewChamp() { return new IChamp(); }
    public registerNewChamp(cycle, domaine, data) { dispatchCreateChamp(this.$store, { cycle, domaine, champ: data }); }
    public deleteChamp(cycle, domaine, champ) { dispatchRemoveChamp(this.$store, { cycle, domaine, champ }) }

    public getNewCompetence() { return new ICompetence(); }
    public registerNewCompetence(cycle, domaine, champ, data) { dispatchCreateCompetence(this.$store, { cycle, domaine, champ, competence: data }); }
    public deleteCompetence(cycle, domaine, champ, competence) { dispatchRemoveCompetence(this.$store, { cycle, domaine, champ, competence }) }


    public mounted() {
        window.scrollTo(0, 0);
    }
}
