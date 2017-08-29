import { appActionTypes } from './appActionTypes';
import config from '../../config';
import api from '../../es2x/api';

const appApi = api(config.urls.api);

const initialState = {
  total: 0,
  teste: 1,
};

const app = (state = initialState, action) => {
  switch (action.type) {

    case appActionTypes.ADD:
      return { ...state, total: state.total + 1 };

    case appActionTypes.RESET_TOTAL:
      // appApi.get('/reset').then((data) => {
      //   console.log('data', data);
      // }).catch((error) => {
      //   console.log('error', error);
      // });
      console.log('------------------');
      console.log('action', action);
      console.log('state', state);
      return state;

    default:
      return state;
  }
};

export { app };
