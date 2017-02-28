import {combineReducers} from 'redux';
import documentos from './containers/Documentos/documentosReducer';
import autenticacao from './containers/autenticacao/autenticacaoReducer';


export default combineReducers({
    documentos,
    autenticacao
});
