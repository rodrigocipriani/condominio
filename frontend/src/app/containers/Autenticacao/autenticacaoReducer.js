import {autenticacaoActionTypes} from './autenticacaoActionTypes';
import Auth from './Auth';

const initialState = {
    isLogged: false,
    usuario: null
};
const actionsMap = {

    [autenticacaoActionTypes.REQ_LOGGED_USER_SUCCESS]: (state, action) => {
        console.log('actionTypes.REQ_LOGGED_USER_SUCCESS', action);

        Auth.authenticateUser(action.payload);

        return {...state, isLogged: action.payload != null, usuario: Auth.getUser()};
    },

    [autenticacaoActionTypes.SIGNIN_SUCCESS]: (state, action) => {
        console.log('actionTypes.SIGNIN_SUCCESS', action);

        Auth.authenticateUser(action.payload);

        return {...state, isLogged: action.payload != null, usuario: Auth.getUser()};
    },

    [autenticacaoActionTypes.SIGNIN_ERROR]: (state, action) => {
        console.log('actionTypes.SIGNIN_ERROR', action.error.response.data);

        let mensagens = action.error.response.data.mensagens;

        let errors = mensagens || [];

        // todo : tratar aqui o erro para deixar os campos do formulário indicando erro
        // todo : capturar estas mensagens de erro em um reducer no App para lançar mensagens na tela
        console.log('mensagens || []', errors);

        return {...state};
    },

    [autenticacaoActionTypes.SIGNOUT_SUCCESS]: (state, action) => {
        console.log('actionTypes.SIGNOUT_SUCCESS', action);

        Auth.deauthenticateUser();

        return {...state, isLogged: false, usuario: null};
    },

    [autenticacaoActionTypes.REQUEST_ERROR]: (state, action) => {
        console.log('actionTypes.REQUEST_ERROR', action);

        let isLogged = true;
        let usuario = state.usuario;
        if(action.error.response.status == 401) {
            Auth.deauthenticateUser();
            isLogged = false;
            usuario = null;
        }

        return {...state, isLogged: isLogged, usuario: usuario};
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = action.type.endsWith('_ERROR') ? actionsMap[autenticacaoActionTypes.REQUEST_ERROR] : actionsMap[action.type];
    return fn ? fn(state, action) : state;
}

