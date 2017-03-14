import {autenticacaoActionTypes} from './autenticacaoActionTypes';
import Auth from './Auth';

const initialState = {
    isLogged: false,
    usuario: null
};
const actionsMap = {

    [autenticacaoActionTypes.REQ_LOGGED_USER_SUCCESS]: (state, action) => {

        const user = action.payload;

        return gravarUsuario(user, state);
    },

    [autenticacaoActionTypes.SIGNIN_SUCCESS]: (state, action) => {

        const user = action.payload;

        return gravarUsuario(user, state);
    },

    [autenticacaoActionTypes.SIGNUP_SUCCESS]: (state, action) => {

        const user = action.payload;

        return gravarUsuario(user, state);
    },

    [autenticacaoActionTypes.SIGNIN_ERROR]: (state, action) => {

        let mensagens = action.error.response.data.mensagens;

        let errors = mensagens || [];

        // todo : tratar aqui o erro para deixar os campos do formulário indicando erro
        // todo : capturar estas mensagens de erro em um reducer no App para lançar mensagens na tela
        console.log('mensagens || []', errors);

        return {...state};
    },

    [autenticacaoActionTypes.SIGNOUT_SUCCESS]: (state, action) => {

        Auth.deauthenticateUser();

        return {...state, isLogged: false, usuario: null};
    },

    [autenticacaoActionTypes.REQUEST_ERROR]: (state, action) => {

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

const gravarUsuario = (user, state) => {
    if(user){
        Auth.authenticateUser(user);
    }
    console.log('user', user);
    console.log('Auth.getUser()', Auth.getUser());

    return {...state, isLogged: user != null, usuario: user};
};

export default function reducer(state = initialState, action = {}) {
    console.log('action >>> ', action);
    const fn = action.type.endsWith('_ERROR') ? actionsMap[autenticacaoActionTypes.REQUEST_ERROR] : actionsMap[action.type];
    return fn ? fn(state, action) : state;
}

