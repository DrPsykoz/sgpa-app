import { IClasse, IEvaluation } from '@/interfaces';
import { dispatchCreateEvalutation } from '@/store/main/actions';
import { readCompetences, readCycles } from '@/store/main/getters';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class DialogAjoutEvaluation extends Vue {

    @Prop() classe: IClasse;
    @Prop() buttonClass: string;
    @Prop() editEvaluation: IEvaluation;
    @Prop() buttonText: string;
    @Prop() isTextButton: boolean;

    public dialog = false;
    public evaluation: IEvaluation = {} as IEvaluation;
    public isEdit = false;

    public trimestres = ["1er trimestre", "2eme trimestre", "3eme trimestre"];
    public annees = ["4eme", "3eme"];

    get cycles() {
        return readCycles(this.$store);
    }

    get competences() {
        return readCompetences(this.$store);
    }

    public confirm() {

        dispatchCreateEvalutation(this.$store, {
            classe: this.classe, evaluation: this.evaluation
        });

        this.dialog = false;
        this.evaluation = {} as IEvaluation;
    }

    public cancel() {
        this.dialog = false;
    }

    public mounted() {
        this.dialog = false;

        if (this.editEvaluation) {
            this.evaluation = this.editEvaluation;
            this.isEdit = true;
        } else {
            this.evaluation = {} as IEvaluation;
            this.isEdit = false;
        }
    }

}
