import storeCreator from '../es2x/storeCreator';
import config from '../config';

console.log('config', config);

import appReducer from './appReducer';

const showLoggers  = false;
const isProduction = config.env.isProduction;

export default storeCreator({
  appReducer,
}, { isProduction, showLoggers });
