import storeCreator from '../es2x/storeCreator';
import config from '../config';
import { persistentReducer } from 'redux-pouchdb';

console.log('config', config);

import appReducer from './App/appReducer';
import usuarioReducer from './App/usuarioReducer';

const showLoggers = false;
const isProduction = config.env.isProduction;

export default storeCreator({
  appReducer: persistentReducer(appReducer),
  usuarioReducer: persistentReducer(usuarioReducer),
}, { isProduction, showLoggers });
