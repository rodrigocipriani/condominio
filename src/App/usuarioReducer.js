import { appActionTypes } from './appActionTypes';

const initialState = {
  total: 0,
  teste: 1,
};

const usuarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActionTypes.ADD:
      return { ...state, total: state.total + 1 };
    default:
      return state;
  }
};

export default usuarioReducer;
