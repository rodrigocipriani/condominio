import {combineReducers} from 'redux';

/**
 * Importar reducers
 * */
import indexReducer from './containers/Index/indexReducer';
import appReducer from './containers/App/appReducer';
import documentosReducer from './containers/Documentos/documentosReducer';
import autenticacaoReducer from './containers/Autenticacao/autenticacaoReducer';


export default combineReducers({
    // incluir reducers
    indexReducer,
    appReducer,
    documentosReducer,
    autenticacaoReducer
});
