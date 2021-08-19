import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { MainState } from './state';

const defaultState: MainState = {
  classes: [],
  cycles: [],
  notifications: [],
};

export const mainModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
