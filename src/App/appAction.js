import { appActionTypes } from './appActionTypes';
import store from '../store';

export const add = params => store.dispatch({
  type: appActionTypes.ADD, ...params,
});
