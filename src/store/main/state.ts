import { IClasse, ICycle, INotification } from '@/interfaces';

export interface MainState {
    classes: IClasse[];
    cycles: ICycle[];
    notifications: INotification[];
}
