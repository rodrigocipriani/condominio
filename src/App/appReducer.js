import reducerCreator from '../../es2x/reducerCreator';
import { appActionTypes } from './appActionTypes';

const initialState = {
  total: 0,
  teste: 1,
};

const actionsMap = {

  [appActionTypes.ADD]: (state, action) => {
    return { ...state, total: state.total + 1 };
  },

};

export default reducerCreator(initialState, actionsMap);
