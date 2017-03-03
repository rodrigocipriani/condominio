import {actionTypes} from './autenticacaoActionTypes';
import Auth from './Auth';

const initialState = {
    usuario: null
};
const actionsMap = {

    [actionTypes.REQ_LOGGED_USER_SUCCESS]: (state, action) => {
        console.log('actionTypes.REQ_LOGGED_USER_SUCCESS', action);

        return {...state, usuario: action.payload};
    },

    [actionTypes.SIGNIN_SUCCESS]: (state, action) => {
        console.log('actionTypes.SIGNIN_SUCCESS', action);
        // save the token
        Auth.authenticateUser(action.payload.token);

        return {...state, usuario: action.payload.usuario};
    },

    [actionTypes.SIGNIN_ERROR]: (state, action) => {
        console.log('actionTypes.SIGNIN_ERROR', action.error.response.data);

        let mensagens = action.error.response.data.mensagens;

        let errors = mensagens || [];

        // todo : tratar aqui o erro para deixar os campos do formulário indicando erro
        // todo : capturar estas mensagens de erro em um reducer no App para lançar mensagens na tela
        console.log('mensagens || []', errors);

        return {...state};
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}

