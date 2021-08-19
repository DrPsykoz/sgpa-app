import { Component, Vue } from 'vue-property-decorator';
import { readClasses, readCycles } from '@/store/main/getters';

@Component({})
export default class GestionDomaines extends Vue {

    get classes() {
        return readClasses(this.$store);
    }

    get cycles() {
        return readCycles(this.$store);
    }


    public mounted() {
        window.scrollTo(0, 0);
    }
}
