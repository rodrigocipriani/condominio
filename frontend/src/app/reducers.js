import {combineReducers} from 'redux';
import indexReducer from './containers/Index/indexReducer';
import appReducer from './containers/App/appReducer';
import documentosReducer from './containers/Documentos/documentosReducer';
import autenticacaoReducer from './containers/Autenticacao/autenticacaoReducer';


export default combineReducers({
    indexReducer,
    appReducer,
    documentosReducer,
    autenticacaoReducer
});
