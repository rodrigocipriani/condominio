import api from '../../es2x/api';
import config from '../../config';
import { appActionTypes } from './appActionTypes';

const appApi = api(config.urls.api);


export const add = total => ({
  type: appActionTypes.ADD,
  payload: total,
});

export const reset = () => ({
  type: appActionTypes.RESET_TOTAL,
  promise: appApi.get('/reset'),
});

export const criarLista = tamanho => ({
  type: appActionTypes.CRIAR_LISTA,
  promise: appApi.get(`/criarlista/${tamanho}`),
});

export const criarListaClient = () => ({
  type: appActionTypes.CRIAR_LISTA_CLIENT,
});
