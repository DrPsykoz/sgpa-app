import { Component, Vue } from 'vue-property-decorator';

import * as utils from '@/utils';
import { readCurrentState } from './store/main/getters';
import { commitSetCurrentState } from './store/main/mutations';
import { MainState } from './store/main/state';

@Component
export default class App extends Vue {

  public data = {};
  public saveAlert = false;

  public saveData() {
    this.saveAlert = true;
    utils.writeToFileSync("./static/data.json", JSON.stringify(readCurrentState(this.$store)));
    setTimeout(() => {
      this.saveAlert = false;
    }, 1000);
  }

  public mounted() {
    this.data = JSON.parse(utils.readFromFile("./static/data.json"));
    console.log(this.data);
    commitSetCurrentState(this.$store, this.data as MainState);
    console.log(readCurrentState(this.$store));
  }

}
