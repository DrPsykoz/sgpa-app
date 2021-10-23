import { Component, Vue } from 'vue-property-decorator';

import { readCurrentState, readNotifications } from './store/main/getters';
import { commitClearNotifications, commitSetCurrentState } from './store/main/mutations';
import { MainState } from './store/main/state';
import { dispatchAddNotification, dispatchRemoveNotification } from './store/main/actions';
import { ENotificationType, INotification } from './interfaces';

@Component
export default class App extends Vue {

  public data: MainState = { classes: [], cycles: [], notifications: [] };
  public saveAlert = false;

  get notifications() {
    return readNotifications(this.$store);
  }

  public saveData() {
    const result = this.$GlobalUtils.writeToFileSync("./static/data.json", JSON.stringify(readCurrentState(this.$store)));
    if (result) {
      dispatchAddNotification(this.$store, {
        notification: new INotification({
          text: 'Sauvegarde terminée !',
          type: ENotificationType.SUCCESS,
        })
      });
    } else {
      dispatchAddNotification(this.$store, {
        notification: new INotification({
          text: 'Erreur lors de la sauvegarde !',
          type: ENotificationType.ERROR,
        })
      });
    }

  }

  public removeNotification(notification) {
    dispatchRemoveNotification(this.$store, { id: notification.id });
  }

  public afterRouteChange(from, to) {
    window.scrollTo(0, 0);
  }

  public mounted() {
    this.data = JSON.parse(this.$GlobalUtils.readFromFile("./static/data.json")) as MainState;

    /*
     *   Ajout des seances
     *   
     *   Creation de la liste des seances pour chaque classe si elle n'existe pas encore pour eviter les erreurs.
     */
    this.data.classes.forEach((classe) => {
      if (!classe.seances) {
        this.$set(classe, 'seances', []);
      }
    });


    /*
     *    Mise a jour des evalutations
     *
     *    Ajout d'un nom personnalisé pour les evaluations
     */
    this.data.classes.forEach((classe) => {
      classe.evaluations.forEach((evaluation) => {
        evaluation.display_name = '';
      });
    });

    commitSetCurrentState(this.$store, this.data as MainState);
    commitClearNotifications(this.$store);
  }

}
