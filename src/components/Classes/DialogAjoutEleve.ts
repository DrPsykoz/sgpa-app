import { IClasse, IEleve } from '@/interfaces';
import { dispatchCreateEleve } from '@/store/main/actions';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class DialogAjoutEleve extends Vue {

    @Prop() classe: IClasse;
    @Prop() buttonClass: string;

    public dialog = false;
    public eleve: IEleve = {} as IEleve;

    public confirm() {

        dispatchCreateEleve(this.$store, {
            classe: this.classe, eleve: this.eleve
        });

        this.dialog = false;
        this.eleve = {} as IEleve;
    }

    public cancel() {
        this.dialog = false;
    }

    public mounted() {
        this.dialog = false;
    }

}
