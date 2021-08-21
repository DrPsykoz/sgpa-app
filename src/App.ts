import { Component, Vue } from 'vue-property-decorator';

import { readCurrentState, readNotifications } from './store/main/getters';
import { commitClearNotifications, commitSetCurrentState } from './store/main/mutations';
import { MainState } from './store/main/state';
import { dispatchAddNotification, dispatchRemoveNotification } from './store/main/actions';
import { ENotificationType, INotification } from './interfaces';

@Component
export default class App extends Vue {

  public data = {};
  public saveAlert = false;

  get notifications() {
    return readNotifications(this.$store);
  }

  public saveData() {
    this.$GlobalUtils.writeToFileSync("./static/data.json", JSON.stringify(readCurrentState(this.$store)));
    dispatchAddNotification(this.$store, {
      notification: new INotification({
        text: 'Sauvegarde terminée !',
        type: ENotificationType.SUCCESS,
      })
    });
  }

  public removeNotification(notification) {
    dispatchRemoveNotification(this.$store, { id: notification.id });
  }

  public afterRouteChange(from, to) {
    window.scrollTo(0, 0);
  }

  public mounted() {
    this.data = JSON.parse(this.$GlobalUtils.readFromFile("./static/data.json"));
    commitSetCurrentState(this.$store, this.data as MainState);
    commitClearNotifications(this.$store);
  }

}
