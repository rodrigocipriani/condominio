import { appActionTypes } from './appActionTypes';

const initialState = {
  total: 0,
  teste: 1,
  biglist: [{ id: 0, nome: 'item 0' }],
};

const app = (state = initialState, action) => {
  console.log('action---', action);

  switch (action.type) {

    case appActionTypes.ADD:
      const total = action.payload ? parseInt(action.payload, 0) : state.total + 1;
      return { ...state, total };

    case appActionTypes.CRIAR_LISTA_CLIENT:
      console.log('biglist111');
      const biglist = [];
      for (let i = 0; i < state.total; i++) {
        biglist.push({
          id: i,
          nome: `item ${i}`,
        });
      }
      console.log('biglist', biglist);
      return { ...state, biglist };

    case appActionTypes.RESET_TOTAL:
      console.log('------------------');
      console.log('action', action);
      console.log('state', state);
      return state;

    default:
      return state;
  }
};

export { app };
