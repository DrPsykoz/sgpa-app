import { Component, Vue } from 'vue-property-decorator';

import * as utils from '@/utils';

@Component
export default class App extends Vue {

    public data = {};
    public saveAlert = false;

    public saveData() {
      this.saveAlert = true;
      utils.writeToFileSync("./static/data.json", JSON.stringify(this.data));
      setTimeout(() => {
        this.saveAlert = false;
      }, 1000);
    }
    
    public mounted() {
        this.data = JSON.parse(utils.readFromFile("./static/data.json"));
        console.log(this.data);
    }

}
